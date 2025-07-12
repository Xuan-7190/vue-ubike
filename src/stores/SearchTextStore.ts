import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchTextStore = defineStore('searchtext', () => {
    const searchText = ref<string>('復興南路');
    const tooltipToggle = ref(false);

    return { searchText, tooltipToggle }
})