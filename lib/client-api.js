export async function apiErrorMessage(response, fallback) {
  const body = await response.json().catch(() => null);
  return body?.error || fallback;
}
