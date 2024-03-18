import { defineStore } from 'pinia'
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc
} from 'firebase/firestore'
import { db } from '@/db/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef
let notesCollectionQuery
let unsubscribeNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => ({
    notes: [],
    notesLoaded: false
  }),
  actions: {
    init() {
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false

      if (unsubscribeNotesSnapshot) {
        unsubscribeNotesSnapshot()
      }

      unsubscribeNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let note = { id: doc.id, content: doc.data().content, date: doc.data().date }

          notes.push(note)
        })

        this.notes = notes
        this.notesLoaded = true
      })
    },
    async addNote(content) {
      const date = new Date().getTime().toString()

      await addDoc(notesCollectionRef, {
        date,
        content
      })
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id.toString()), {
        content
      })
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id))
    },
    clearNotes() {
      this.notes = []

      if (unsubscribeNotesSnapshot) {
        unsubscribeNotesSnapshot()
      }
    }
  },
  getters: {
    getNoteContent: (state) => (id) => state.notes.find((note) => note.id === id).content,
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    },
    totalNotes(state) {
      return state.notes.length
    },
    totalCharacters(state) {
      return state.notes.reduce((total, note) => total + note.content.length, 0)
    }
  }
})
