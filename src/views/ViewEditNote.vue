<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContentRef"
      ref="addEditNoteRef"
      bgColor="link"
      label="Edit Note"
      placeholder="Edit note"
      ><template #buttons
        ><button @click="$router.back()" class="button is-link is-light mr-2">Cancel</button
        ><button
          @click="handleSaveClick"
          class="button is-link has-background-link"
          :disabled="!noteContentRef"
        >
          Save Note
        </button></template
      ></AddEditNote
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '@/components/notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const route = useRoute()
const router = useRouter()
const noteContentRef = ref('')
const storeNotes = useStoreNotes()

noteContentRef.value = storeNotes.getNoteContent(route.params.id)

const handleSaveClick = () => {
  storeNotes.updateNote(route.params.id, noteContentRef.value)

  router.back()
}
</script>

<style lang="scss" scoped></style>
