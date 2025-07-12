import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useDisabledStore } from '@/stores/disabledStore';
import { showToast } from '@/composables/useToast';


export const useYoubikeStore = defineStore('youbike', () => {
  const { disabled } = storeToRefs(useDisabledStore());

  const data = ref<any[]>([])
  const loadingGetData = ref(false)

  const getData = async () => {
    disabled.value = true
    loadingGetData.value = true
    try {
      const ubikeUrl = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
      const res = await axios.get(ubikeUrl)
      data.value = res.data
      showToast('取得資料成功', 2);
    } catch (err: any) {
      const error: string = err.message || '發生錯誤'
      console.log(error);
    } finally {
      disabled.value = false
      loadingGetData.value = false
    }
  }

  return { data, loadingGetData, getData }
})
