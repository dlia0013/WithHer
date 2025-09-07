const LS_USERS_KEY = 'wh_users';
const LS_SESSION_KEY = 'wh_session';

function _readUsers() {
  const raw = localStorage.getItem(LS_USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function _writeUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}
export async function hashPassword(plain) {
  const enc = new TextEncoder().encode(plain);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(buf));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function register({ email, password, name, role }) {
  const users = _readUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email already registered');
  }
  const passwordHash = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    name: name?.trim() || 'User',
    role: role || 'user', 
    createdAt: Date.now()
  };
  users.push(user);
  _writeUsers(users);
  // 默认自动登录
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, role: user.role, name: user.name }));
  return user;
}

export async function login({ email, password }) {
  const users = _readUsers();
  const target = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!target) throw new Error('Account not found');
  const hash = await hashPassword(password);
  if (hash !== target.passwordHash) throw new Error('Wrong password');
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify({ id: target.id, email: target.email, role: target.role, name: target.name }));
  return target;
}

export function logout() {
  localStorage.removeItem(LS_SESSION_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(LS_SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return !!getCurrentUser();
}