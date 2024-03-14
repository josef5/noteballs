import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => ({
    notes: [
      {
        id: 1,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. A minima, quos optio ut in vel mollitia blanditiis quas ipsa culpa aliquid cupiditate quibusdam tempore dignissimos nobis nemo, id corporis deleniti!'
      },
      {
        id: 2,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
      }
    ]
  }),
  actions: {
    addNote(newNoteContent) {
      console.log('addNote :', newNoteContent)

      const id = new Date().getTime()

      const note = {
        id,
        content: newNoteContent
      }

      this.notes.unshift(note)
    },
    updateNote(id, newNoteContent) {
      const index = this.notes.findIndex((note) => note.id === id)
      this.notes[index].content = newNoteContent
    },
    deleteNote(id) {
      console.log('deleteNote id :', id)
      this.notes = this.notes.filter((note) => note.id !== id)
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
