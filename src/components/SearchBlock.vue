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
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisabledStore } from '@/stores/disabledStore';
import { useSearchTextStore } from '@/stores/SearchTextStore';
import { useYoubikeStore } from '@/stores/YoubikeStore';
import { useSearchResultStore } from '@/stores/SearchResultStore';


const { disabled } = storeToRefs(useDisabledStore());
const { searchText, tooltipToggle } = storeToRefs(useSearchTextStore());
const { loadingGetData } = storeToRefs(useYoubikeStore());
const { getData } = useYoubikeStore();
const { loadingSearch } = storeToRefs(useSearchResultStore());
const { Search } = useSearchResultStore();


onMounted(() => {
    getData();
})
</script>

<style scoped></style>