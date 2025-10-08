async function request(path: string, opts: RequestInit) {
  const url = `${process.env.NEXT_PUBLIC_API_URL ?? ''}${path}`;
  // Attach token automatically if present
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = new Headers(opts.headers as HeadersInit);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(url, { ...opts, headers });
  const contentType = res.headers.get('content-type') || '';

  // Try to parse as JSON when content-type says so, otherwise read as text
  let body: any = null;
  try {
    if (contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
  } catch (e) {
    // If parsing fails, fall back to text
    try {
      body = await res.text();
    } catch (e2) {
      body = null;
    }
  }

  if (!res.ok) {
    const msg =
      typeof body === 'string'
        ? body
        : body && body.message
        ? body.message
        : `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return body;
}

export async function postLogin(body: { username: string; password: string }) {
  return request('/api/v1/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function postRegister(body: Record<string, any>) {
  return request('/api/v1/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function verifyToken(token: string) {
  return request('/api/v1/users/verify', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
}
