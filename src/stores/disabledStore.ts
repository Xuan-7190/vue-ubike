import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDisabledStore = defineStore('disabled', () => {
  const disabled = ref(false)

  return { disabled }
})