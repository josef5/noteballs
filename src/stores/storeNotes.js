import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/db/firebase'

const notesCollectionRef = collection(db, 'notes')

export const useStoreNotes = defineStore('storeNotes', {
  state: () => ({
    notes: []
  }),
  actions: {
    async getNotes() {
      onSnapshot(notesCollectionRef, (querySnapshot) => {
        let notes = []

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let note = { id: doc.id, content: doc.data().content }

          notes.push(note)
        })

        this.notes = notes
      })
    },
    async addNote(newNoteContent) {
      const id = new Date().getTime().toString()

      await setDoc(doc(notesCollectionRef, id), {
        content: newNoteContent
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
    getNoteContent: (state) => (id) =>
      state.notes.find((note) => note.id === id.toString()).content,
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
