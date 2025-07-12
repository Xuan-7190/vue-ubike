import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useDisabledStore } from '@/stores/disabledStore';
import { useSearchTextStore } from '@/stores/SearchTextStore';
import { useYoubikeStore } from '@/stores/YoubikeStore';
import { showToast } from '@/composables/useToast';


export const useSearchResultStore = defineStore('searchresult', () => {
    const { disabled } = storeToRefs(useDisabledStore());
    const { searchText, tooltipToggle } = storeToRefs(useSearchTextStore());
    const { data } = storeToRefs(useYoubikeStore());

    const searchResult = ref<any[]>([])
    const loadingSearch = ref(false)

    const Search = () => {
        if (!searchText.value.trim()) {
            tooltipToggle.value = true;
            return;
        }

        tooltipToggle.value = false;
        disabled.value = true;
        loadingSearch.value = true;

        try {
            searchResult.value = data.value.filter((d) => d['ar']?.includes(searchText.value) || d['sarea']?.includes(searchText.value) || d['sna']?.includes(searchText.value))
            showToast('搜尋成功', 2);
        } catch (err: any) {
            const error: string = err.message || '發生錯誤'
            console.log(error);
        } finally {
            disabled.value = false;
            loadingSearch.value = false;
        }
    }

    return { searchResult, loadingSearch, Search }
})