<template>

    <div class="flex justify-center items-center mt-5">
        <div class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h2 class="text-2xl font-bold">Youbike</h2>

            <legend class="fieldset-legend">搜尋關鍵字</legend>
            <div :class="[{ 'tooltip': tooltipToggle }, 'tooltip-open tooltip-error']" data-tip="請輸入搜尋關鍵字">
                <input type="text" v-model.trim="searchText" class="input" placeholder="請輸入標題" :disabled="disabled"
                    @keyup.enter.prevent="Search" />
            </div>
            <div class="mt-5">
                <button :class="['btn', { 'btn-disabled': disabled }, 'btn-outline btn-primary']" @click.prevent="Search">
                    <span v-if="loadingSearch" class="loading loading-spinner"></span>
                    {{ loadingSearch ? '' : '查詢' }}
                </button>
                <button :class="['btn', { 'btn-disabled': disabled }, 'btn-dash btn-error text-2sm ml-2']" @click.prevent="getData">
                    <span v-if="loadingGetData" class="loading loading-spinner"></span>
                    {{ loadingGetData ? '' : '重新整理資料' }}
                </button>
            </div>
        </div>
    </div>

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
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { getSvgIcon } from '../config/svg';
import type { SvgIconName } from '../config/svg';
import { useDisabledStore } from '@/stores/disabledStore';
import { useSearchTextStore } from '@/stores/SearchTextStore';
import { useYoubikeStore } from '@/stores/YoubikeStore';
import { useSearchResultStore } from '@/stores/SearchResultStore';
import { useMyFavoriteStore } from '@/stores/MyFavoriteStore';
import SearchResult from '../components/SearchResult.vue';
import MyFavorite from '../components/MyFavorite.vue';


const { disabled } = storeToRefs(useDisabledStore());
const { searchText, tooltipToggle } = storeToRefs(useSearchTextStore());
const { loadingGetData } = storeToRefs(useYoubikeStore());
const { getData } = useYoubikeStore();
const { loadingSearch } = storeToRefs(useSearchResultStore());
const { Search } = useSearchResultStore();
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
    getData();
    getMyFavorite();
})
</script>

<style scoped></style>
