import { defineStore } from 'pinia'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '@/db/firebase'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => ({
    user: {}
  }),
  actions: {
    init() {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User logged IN', user)

          this.user.id = user.uid
          this.user.email = user.email

          storeNotes.init()

          this.router.push('/')
        } else {
          console.log('User logged OUT', user)

          this.user = {}
          storeNotes.clearNotes()

          this.router.replace('/auth')
        }
      })
    },
    register(credentials) {
      console.log('[authStore] register', credentials)
      const { email, password } = credentials

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user
          console.log('user :', user)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    login(credentials) {
      console.log('[authStore] login', credentials)
      const { email, password } = credentials

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log('user :', user)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    logout() {
      // console.log('[authStore] logout')
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          // console.log('User signed out')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
})
