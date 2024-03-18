import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
  { path: '/', name: 'notes', component: ViewNotes },
  { path: '/editNote/:id', name: 'edit-note', component: ViewEditNote },
  { path: '/stats', name: 'stats', component: ViewStats },
  { path: '/auth', name: 'auth', component: ViewAuth }
]

const router = createRouter({
  history: createWebHashHistory(), // Applies a # to the URL
  routes
})

router.beforeEach(async (to) => {
  const storeAuth = useStoreAuth()

  if (to.name !== 'auth' && !storeAuth.user.id) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && storeAuth.user.id) {
    return false
  }
})

export default router
