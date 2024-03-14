<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note"
      ><template #buttons
        ><button
          class="button is-link has-background-success"
          :disabled="!newNote"
          @click="addNote"
        >
          Add New Note
        </button></template
      ></AddEditNote
    >

    <NoteItem v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import NoteItem from '@/components/notes/NoteItem.vue'
import AddEditNote from '@/components/notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()
const newNote = ref('')
const addEditNoteRef = ref(null)

const addNote = () => {
  storeNotes.addNote(newNote.value)

  newNote.value = ''
  addEditNoteRef.value.focusTextArea()
}

watch(newNote, (newValue) => {
  console.log('newValue :', newValue)
  // storeNotes.updateLocalStorage()
})
</script>

<style lang="scss" scoped></style>
