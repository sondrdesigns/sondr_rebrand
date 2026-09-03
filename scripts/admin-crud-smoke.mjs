import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.ADMIN_SMOKE_BASE_URL || 'http://localhost:3001';
const password = process.env.ADMIN_PASSWORD;

if (!password) {
  throw new Error('ADMIN_PASSWORD is required');
}

let cookie = '';
const created = { member: null, project: null, task: null, post: null, upload: null };

async function request(path, options = {}, expected = null) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...options.headers,
    },
  });

  const body = await response.json().catch(() => null);
  const detail = `${options.method || 'GET'} ${path} returned ${response.status}: ${JSON.stringify(body)}`;
  if (expected == null) assert.ok(response.ok, detail);
  else assert.equal(response.status, expected, detail);
  return { response, body };
}

async function remove(path) {
  if (!path) return;
  await request(path, { method: 'DELETE' });
}

const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

try {
  const login = await request('/api/admin/auth', {
    method: 'POST',
    body: JSON.stringify({ email: 'crud-audit@sondr', password }),
  });
  cookie = login.response.headers.get('set-cookie')?.split(';', 1)[0] || '';
  assert.ok(cookie, 'Login did not return an admin session cookie');

  const memberName = `CRUD Audit Member ${suffix}`;
  const memberCreated = await request('/api/admin/members', {
    method: 'POST',
    body: JSON.stringify({ name: memberName, role: 'Audit' }),
  });
  created.member = memberCreated.body.id;
  await request(`/api/admin/members/${created.member}`, {
    method: 'PUT',
    body: JSON.stringify({ name: memberName, role: 'Verified' }),
  });
  const memberRead = await request(`/api/admin/members/${created.member}`);
  assert.equal(memberRead.body.role, 'Verified');
  assert.ok(memberRead.body.createdAt, 'Member update removed createdAt');

  const projectCreated = await request('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: `CRUD Audit Project ${suffix}`,
      status: 'Pitched',
      memberIds: [created.member],
    }),
  });
  created.project = projectCreated.body.id;
  await request(`/api/admin/projects/${created.project}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: `CRUD Audit Project ${suffix}`,
      status: 'Active',
      memberIds: [created.member],
    }),
  });
  const projectRead = await request(`/api/admin/projects/${created.project}`);
  assert.equal(projectRead.body.status, 'Active');
  assert.ok(projectRead.body.createdAt, 'Project update removed createdAt');

  const taskCreated = await request('/api/admin/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: `CRUD Audit Task ${suffix}`,
      projectId: created.project,
      status: 'todo',
      priority: 'medium',
      assigneeId: created.member,
    }),
  });
  created.task = taskCreated.body.id;
  await request(`/api/admin/tasks/${created.task}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: `CRUD Audit Task ${suffix}`,
      projectId: created.project,
      status: 'done',
      priority: 'medium',
      assigneeId: created.member,
    }),
  });
  const taskRead = await request(`/api/admin/tasks/${created.task}`);
  assert.equal(taskRead.body.status, 'done');
  assert.ok(taskRead.body.createdAt, 'Task update removed createdAt');

  await remove(`/api/admin/tasks/${created.task}`);
  await request(`/api/admin/tasks/${created.task}`, {}, 404);
  created.task = null;

  const cascadeTaskCreated = await request('/api/admin/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: `CRUD Audit Cascade Task ${suffix}`,
      projectId: created.project,
      status: 'todo',
      priority: 'low',
      assigneeId: created.member,
    }),
  });
  created.task = cascadeTaskCreated.body.id;

  await remove(`/api/admin/members/${created.member}`);
  await request(`/api/admin/members/${created.member}`, {}, 404);
  created.member = null;
  const unassignedTask = await request(`/api/admin/tasks/${created.task}`);
  assert.equal(unassignedTask.body.assigneeId, '');
  const unassignedProject = await request(`/api/admin/projects/${created.project}`);
  assert.deepEqual(unassignedProject.body.memberIds, []);

  const postCreated = await request('/api/admin/posts', {
    method: 'POST',
    body: JSON.stringify({
      frontmatter: { title: `CRUD Audit Post ${suffix}`, status: 'draft' },
      content: '<p>created</p>',
    }),
  });
  created.post = postCreated.body.slug;
  await request('/api/admin/posts', {
    method: 'POST',
    body: JSON.stringify({
      frontmatter: { title: `CRUD Audit Post ${suffix}`, status: 'draft' },
      content: '<p>duplicate</p>',
    }),
  }, 409);
  const originalPostSlug = created.post;
  const renamedPostSlug = `${created.post}-renamed`;
  const postUpdated = await request(`/api/admin/posts/${originalPostSlug}`, {
    method: 'PUT',
    body: JSON.stringify({
      frontmatter: { title: `CRUD Audit Post ${suffix}`, slug: renamedPostSlug, status: 'draft' },
      content: '<p>updated</p>',
    }),
  });
  assert.equal(postUpdated.body.slug, renamedPostSlug);
  created.post = renamedPostSlug;
  await request(`/api/admin/posts/${originalPostSlug}`, {}, 404);
  const postRead = await request(`/api/admin/posts/${created.post}`);
  assert.equal(postRead.body.content.trim(), '<p>updated</p>');

  const imageForm = new FormData();
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
  imageForm.append('file', new Blob([png], { type: 'image/png' }), 'audit.png');
  const upload = await request('/api/admin/upload', { method: 'POST', body: imageForm });
  assert.match(upload.body.url, /^\/uploads\/blog\/.+\.png$/);
  created.upload = path.join(process.cwd(), 'public', upload.body.url.replace(/^\//, ''));

  await remove(`/api/admin/posts/${created.post}`);
  await request(`/api/admin/posts/${created.post}`, {}, 404);
  created.post = null;
  await remove(`/api/admin/projects/${created.project}`);
  await request(`/api/admin/projects/${created.project}`, {}, 404);
  await request(`/api/admin/tasks/${created.task}`, {}, 404);
  created.project = null;
  created.task = null;
  await fs.unlink(created.upload);
  created.upload = null;

  console.log('Admin CRUD smoke test passed: members, projects, tasks, posts, and uploads.');
} finally {
  await remove(created.post && `/api/admin/posts/${created.post}`).catch(() => {});
  await remove(created.task && `/api/admin/tasks/${created.task}`).catch(() => {});
  await remove(created.project && `/api/admin/projects/${created.project}`).catch(() => {});
  await remove(created.member && `/api/admin/members/${created.member}`).catch(() => {});
  if (created.upload) await fs.unlink(created.upload).catch(() => {});
}
