import '../lib/firebase'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

let _currentUser = null
let _initialized = false
let _readyOnce
const _subscribers = new Set()

function _notify() {
  for (const cb of _subscribers) {
    try { cb(_currentUser) } catch {}
  }
}

function _ensureAuthWatcher() {
  if (_initialized) return _readyOnce
  _initialized = true
  _readyOnce = new Promise((resolve) => {
    onAuthStateChanged(auth, async (u) => {
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid))
        const data = snap.exists() ? snap.data() : {}
        _currentUser = {
          id: u.uid,
          email: u.email || '',
          name: data.name || u.displayName || 'User',
          role: data.role || 'user',
        }
      } else {
        _currentUser = null
      }
      _notify()
      resolve() 
    })
  })
  return _readyOnce
}

export function ready() {
  return _ensureAuthWatcher()
}

export function onAuthChange(cb) {
  _subscribers.add(cb)
  return () => _subscribers.delete(cb)
}

export async function hashPassword(plain) {
  const enc = new TextEncoder().encode(plain)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  const bytes = Array.from(new Uint8Array(buf))
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function register({ email, password, name, role }) {
  await _ensureAuthWatcher()
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (name) await updateProfile(cred.user, { displayName: name })

  const userDoc = {
    email,
    name: (name || '').trim() || cred.user.displayName || 'User',
    role: role || 'user',
    createdAt: Date.now(),
  }
  await setDoc(doc(db, 'users', cred.user.uid), userDoc)

  _currentUser = {
    id: cred.user.uid,
    email,
    name: userDoc.name,
    role: userDoc.role,
  }
  _notify()
  return _currentUser
}

export async function login({ email, password }) {
  await _ensureAuthWatcher()
  const cred = await signInWithEmailAndPassword(auth, email, password)

  const snap = await getDoc(doc(db, 'users', cred.user.uid))
  const data = snap.exists() ? snap.data() : {}
  _currentUser = {
    id: cred.user.uid,
    email: cred.user.email || email,
    name: data.name || cred.user.displayName || 'User',
    role: data.role || 'user',
  }
  _notify()
  return _currentUser
}

export async function logout() {
  await signOut(auth)
  _currentUser = null
  _notify()
}

export function getCurrentUser() {
  return _currentUser
}
export function isAuthenticated() {
  return !!_currentUser
}
export function hasRole(...roles) {
  return !!_currentUser && roles.includes(_currentUser.role)
}