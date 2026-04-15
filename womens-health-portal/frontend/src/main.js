import './lib/firebase'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'                           
import './assets/layout.css'                 
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { current } from './stores/user'

const auth = getAuth()
const db = getFirestore()
onAuthStateChanged(auth, async (u) => {
  if (u) {
    const snap = await getDoc(doc(db, 'users', u.uid))
    const data = snap.exists() ? snap.data() : {}
    current.user = {
      id: u.uid,
      email: u.email || '',
      name: data.name || u.displayName || 'User',
      role: data.role || 'user',
    }
    current.role = current.user.role
  } else {
    current.user = null
    current.role = null
  }
})

createApp(App).use(router).mount('#app')
