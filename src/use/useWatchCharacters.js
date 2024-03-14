import { watch } from 'vue'

export default function useWatchCharacters(valueToWatch) {
  watch(valueToWatch, (value) => {
    console.log(value)
  })
}
