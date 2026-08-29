const FROM = 'Sondr Studio <studio@sondrdesigns.com>';

function baseTemplate(body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sondr Studio</title>
</head>
<body style="margin:0;padding:0;background:#fffbf0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbf0;">
  <tr><td align="center" style="padding:48px 24px;">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <tr>
        <td style="padding-bottom:32px;border-bottom:1.5px solid #000;">
          <span style="font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(0,0,0,0.45);">Sondr Studio</span>
        </td>
      </tr>
      <tr><td style="padding-top:32px;">${body}</td></tr>
      <tr>
        <td style="padding-top:48px;border-top:1px solid rgba(0,0,0,0.12);">
          <span style="font-size:10px;letter-spacing:0.16em;color:rgba(0,0,0,0.35);text-transform:uppercase;">sondrdesigns.com</span>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function statusBadge(status) {
  const colors = {
    'todo': 'rgba(0,0,0,0.32)',
    'in-progress': '#002fa7',
    'review': '#c88c28',
    'done': '#000',
    'Active': '#002fa7',
    'Pitched': 'rgba(0,0,0,0.35)',
    'On Hold': '#c88c28',
    'Completed': '#000',
  };
  const color = colors[status] || 'rgba(0,0,0,0.4)';
  return `<span style="font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${color};font-family:monospace;">${status}</span>`;
}

export async function sendTaskAssignedEmail(task, project) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !task.assigneeEmail) return;

  const priorityColors = { high: '#b40000', medium: '#c88c28', low: 'rgba(0,0,0,0.3)' };
  const dotColor = priorityColors[task.priority] || priorityColors.medium;

  const dueStr = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const html = baseTemplate(`
    <p style="font-family:Georgia,serif;font-style:italic;font-size:28px;font-weight:400;color:#000;margin:0 0 24px;line-height:1.2;">
      You've been assigned a task.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(0,0,0,0.1);margin-bottom:24px;">
      <tr>
        <td style="padding:20px 22px;border-bottom:1px solid rgba(0,0,0,0.08);">
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${dotColor};flex-shrink:0;margin-top:4px;display:inline-block;"></div>
            <span style="font-size:15px;color:#000;letter-spacing:0.02em;padding-left:10px;">${task.title || 'Untitled task'}</span>
          </div>
          ${task.description ? `<p style="font-size:12px;color:rgba(0,0,0,0.55);margin:10px 0 0 18px;line-height:1.6;">${task.description}</p>` : ''}
        </td>
      </tr>
      <tr>
        <td style="padding:14px 22px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:32px;">
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Status</div>
                ${statusBadge(task.status || 'todo')}
              </td>
              ${task.priority ? `
              <td style="padding-right:32px;">
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Priority</div>
                <span style="font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${dotColor};">${task.priority}</span>
              </td>` : ''}
              ${dueStr ? `
              <td>
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Due</div>
                <span style="font-size:11px;color:rgba(0,0,0,0.6);">${dueStr}</span>
              </td>` : ''}
            </tr>
          </table>
          ${project ? `<div style="margin-top:12px;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(0,0,0,0.4);">${project.name}${project.client ? ` · ${project.client}` : ''}</div>` : ''}
        </td>
      </tr>
    </table>

    <p style="font-size:13px;color:rgba(0,0,0,0.55);letter-spacing:0.04em;line-height:1.6;margin:0 0 20px;">
      Visit your task dashboard to view all assigned work.
    </p>
    <a href="https://sondrdesigns.com/my-tasks" style="display:inline-block;padding:12px 24px;background:#000;color:#fffbf0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;">
      My Tasks →
    </a>
  `);

  const text = [
    `You've been assigned a task: ${task.title}`,
    task.description ? `\n${task.description}` : '',
    `\nStatus: ${task.status || 'todo'}`,
    task.priority ? `Priority: ${task.priority}` : '',
    dueStr ? `Due: ${dueStr}` : '',
    project ? `Project: ${project.name}${project.client ? ` · ${project.client}` : ''}` : '',
    `\nView your tasks: https://sondrdesigns.com/my-tasks`,
  ].filter(Boolean).join('\n');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: task.assigneeEmail,
      subject: `Task assigned: ${task.title || 'New task'}`,
      html,
      text,
    }),
  });
}

export async function sendProjectStatusEmail(project, members) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !members?.length) return;

  const dueStr = project.dueDate
    ? new Date(project.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const html = baseTemplate(`
    <p style="font-family:Georgia,serif;font-style:italic;font-size:28px;font-weight:400;color:#000;margin:0 0 8px;line-height:1.2;">
      Project update.
    </p>
    ${project.client ? `<p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin:0 0 28px;">${project.client}</p>` : '<div style="margin-bottom:28px;"></div>'}

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(0,0,0,0.1);margin-bottom:24px;">
      <tr>
        <td style="padding:20px 22px;border-bottom:1px solid rgba(0,0,0,0.08);">
          <div style="font-size:16px;color:#000;letter-spacing:0.02em;">${project.name}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 22px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:32px;">
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Status</div>
                ${statusBadge(project.status)}
              </td>
              ${dueStr ? `
              <td>
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:4px;">Due</div>
                <span style="font-size:11px;color:rgba(0,0,0,0.6);">${dueStr}</span>
              </td>` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${project.description ? `<p style="font-size:13px;color:rgba(0,0,0,0.55);letter-spacing:0.04em;line-height:1.6;margin:0 0 24px;">${project.description}</p>` : ''}

    <p style="font-size:13px;color:rgba(0,0,0,0.55);letter-spacing:0.04em;line-height:1.6;margin:0 0 20px;">
      This project has been updated. Check with the team for next steps.
    </p>
    <a href="https://sondrdesigns.com/my-tasks" style="display:inline-block;padding:12px 24px;background:#000;color:#fffbf0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;">
      My Tasks →
    </a>
  `);

  const text = [
    `Project update: ${project.name}`,
    project.client ? `Client: ${project.client}` : '',
    `Status: ${project.status}`,
    dueStr ? `Due: ${dueStr}` : '',
    project.description ? `\n${project.description}` : '',
    `\nView your tasks: https://sondrdesigns.com/my-tasks`,
  ].filter(Boolean).join('\n');

  const emails = members.map(m => m.email).filter(Boolean);
  if (!emails.length) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: emails,
      subject: `${project.name} — status updated to ${project.status}`,
      html,
      text,
    }),
  });
}
