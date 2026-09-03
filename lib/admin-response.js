import { NextResponse } from 'next/server';

export function adminErrorResponse(error, fallback = 'Request failed') {
  console.error(fallback, error);
  const unavailable = error?.code === 'STORAGE_UNAVAILABLE';
  return NextResponse.json(
    { error: unavailable ? error.message : fallback },
    { status: unavailable ? 503 : 500 }
  );
}

export function validationError(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function adminReadErrorResponse(error, fallback) {
  if (error?.code === 'ENOENT' || error?.message?.startsWith('Not found:')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return adminErrorResponse(error, fallback);
}
