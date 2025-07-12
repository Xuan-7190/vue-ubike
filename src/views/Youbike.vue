<template>
    <SearchBlock />

    <div class="m-5 mx-25">
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <div class="tabs tabs-lift">
                <template v-for="tab in tabManager">
                    <label class="tab">
                        <input type="radio" name="my_tabs_4" :checked="tab.contentType === 'searchResult'" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4 me-2">
                            <path stroke-linecap="round" stroke-linejoin="round" :d="getSvgIcon(tab.svg)" />
                        </svg>
                        {{ tab.title }}
                    </label>
                    <div class="tab-content bg-base-100 border-base-300 p-6">
                        <component :is="tab.content"></component>
                    </div>
                </template>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getSvgIcon } from '../config/svg';
import type { SvgIconName } from '../config/svg';
import { useMyFavoriteStore } from '@/stores/MyFavoriteStore';
import SearchBlock from '../components/SearchBlock.vue';
import SearchResult from '../components/SearchResult.vue';
import MyFavorite from '../components/MyFavorite.vue';


const { getMyFavorite } = useMyFavoriteStore();


const tabManager: { title: string, svg: SvgIconName, contentType: string, content: any }[] = [
    {
        title: 'Live',
        svg: 'live',
        contentType: "searchResult",
        content: SearchResult,
    },
    {
        title: 'Love',
        svg: 'love',
        contentType: "myFavorite",
        content: MyFavorite,
    }
]


onMounted(() => {
    getMyFavorite();
})
</script>

<style scoped></style>
