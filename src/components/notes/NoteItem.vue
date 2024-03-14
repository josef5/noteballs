<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">Date: {{ dateFormatted }} </small>
          <small class="column has-text-right">{{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
    </footer>
    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
// import { useStoreNotes } from '@/stores/storeNotes'
import ModalDeleteNote from '@/components/notes/ModalDeleteNote.vue'
import { useDateFormat } from '@vueuse/core'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

// const storeNotes = useStoreNotes()

const dateFormatted = computed(() => {
  const date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD MMMM YYYY').value
})

const characterLength = computed(() => {
  const length = props.note.content.length
  const description = length > 1 ? 'characters' : 'character'

  return `${length} ${description}`
})

/* const handleDeleteClick = () => {
  storeNotes.deleteNote(props.note.id)
} */

const modals = reactive({
  deleteNote: false
})
</script>

<style lang="scss" scoped></style>
