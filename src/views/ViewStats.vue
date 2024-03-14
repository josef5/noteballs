<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total Notes</td>
          <td>{{ storeNotes.totalNotes }}</td>
        </tr>
        <tr>
          <td>Character Count</td>
          <td>{{ storeNotes.totalCharacters }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes'

const storeNotes = useStoreNotes()
</script>

<style lang="scss" scoped></style>
