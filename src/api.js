const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof body === 'string' ? body : body.message;
    throw new Error(message || `El servidor rechazó la solicitud (${response.status}).`);
  }

  return body;
}

export function login(credentials) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function register(credentials) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function getCurrentUser(token) {
  return request('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function authenticated(token, path, options = {}) {
  return request(path, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  });
}

export function listContent(app) {
  return request(`/api/content?app=${app}`);
}

export function createContent(token, content) {
  return authenticated(token, '/api/content', { method: 'POST', body: JSON.stringify(content) });
}

export function listReviews(contentId) {
  return request(`/api/content/${contentId}/reviews`);
}

export function createReview(token, contentId, review) {
  return authenticated(token, `/api/content/${contentId}/reviews`, { method: 'POST', body: JSON.stringify(review) });
}

export function listComments(reviewId) {
  return request(`/api/reviews/${reviewId}/comments`);
}

export function createComment(token, reviewId, comment) {
  return authenticated(token, `/api/reviews/${reviewId}/comments`, { method: 'POST', body: JSON.stringify(comment) });
}
