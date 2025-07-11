import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useYoubikeStore = defineStore('youbike', () => {
  const data = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const ubikeUrl = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
      const res = await axios.get(ubikeUrl)
      data.value = res.data
    } catch (err: any) {
      error.value = err.message || '發生錯誤'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
})
