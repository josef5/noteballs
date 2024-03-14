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

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

export const useStoreNotes = defineStore('storeNotes', {
  state: () => ({
    notes: [],
    notesLoaded: false
  }),
  actions: {
    async getNotes() {
      this.notesLoaded = false

      onSnapshot(notesCollectionQuery, (querySnapshot) => {
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
