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

    <progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100" />

    <template v-else>
      <NoteItem v-for="note in storeNotes.notes" :key="note.id" :note="note" />

      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        No notes yet...
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NoteItem from '@/components/notes/NoteItem.vue'
import AddEditNote from '@/components/notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()
const newNote = ref('')
const addEditNoteRef = ref(null)

onMounted(() => {
  storeNotes.getNotes()
})

const addNote = () => {
  storeNotes.addNote(newNote.value)

  newNote.value = ''
  addEditNoteRef.value.focusTextArea()
}
</script>

<style lang="scss" scoped></style>
