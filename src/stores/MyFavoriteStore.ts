import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useSearchResultStore } from '@/stores/SearchResultStore';
import { showToast } from '@/composables/useToast';


export const useMyFavoriteStore = defineStore('myfavorite', () => {
    const { searchResult } = storeToRefs(useSearchResultStore());

    const myFavorite = ref<Array<{ sno?: string, sna?: string, ar?: string, act?: string, available_rent_bikes?: number }>>([]);
    const setFavoriteStorage = (favorites: typeof myFavorite.value) => {
        localStorage.setItem('myFavorite', JSON.stringify(favorites));
    }

    const addMyFavorite = (sno: string) => {
        const found = searchResult.value.find((r) => r.sno === sno);
        if (found && !myFavorite.value.some((item) => item.sno === sno)) {
            myFavorite.value.push({ ...found });
            setFavoriteStorage(myFavorite.value);
            showToast(`${found.sna ?? '已加入我的最愛'}`, 2);
        }
    };

    const removeMyFavorite = (sno: string) => {
        const idx = myFavorite.value.findIndex((item) => item.sno === sno);
        if (idx > -1) {
            const [removed] = myFavorite.value.splice(idx, 1);
            setFavoriteStorage(myFavorite.value);
            showToast(`${removed?.sna ?? '已移除我的最愛'}`, 2);
        }
    };

    const getMyFavorite = () => {
        myFavorite.value = JSON.parse(localStorage.getItem('myFavorite')!) || [];
    }

    return { myFavorite, addMyFavorite, removeMyFavorite, getMyFavorite }
})