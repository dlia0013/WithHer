import { reactive } from 'vue'

// current.user: { id, email, name, role } | null
export const current = reactive({ user: null, role: null })