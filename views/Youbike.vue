<template>

    <div class="flex justify-center items-center mt-5">
        <div class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h2 class="text-2xl font-bold">Youbike</h2>

            <legend class="fieldset-legend">搜尋關鍵字</legend>
            <div :class="[{ 'tooltip': tooltipToggle }, 'tooltip-open tooltip-error']" data-tip="請輸入搜尋關鍵字">
                <input type="text" v-model.trim="searchText" class="input" placeholder="請輸入標題" :disabled="disabled"
                    @keyup.enter="Search" />
            </div>
            <div class="mt-5">
                <button :class="['btn', { 'btn-disabled': disabled }, 'btn-outline btn-primary']" @click="Search">
                    <span v-if="loadingSearch" class="loading loading-spinner"></span>
                    {{ loadingSearch ? '' : '查詢' }}
                </button>
                <button :class="['btn', { 'btn-disabled': disabled }, 'btn-dash btn-error text-2sm ml-2']" @click="getData">
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
                        {{ tab.contentType }}
                        <template v-if="tab.contentType === 'searchResult'">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>站名</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in searchResult">
                                        <td>
                                            <div class="bg-base-100 border-base-300 collapse border">
                                                <input type="checkbox" class="peer" />
                                                <div
                                                    class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                                    {{ item.sna }}
                                                </div>
                                                <div
                                                    class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                                    <div class="stats shadow">
                                                        <div class="stat">
                                                            <div class="stat-title">場站目前車輛數量</div>
                                                            <div class="stat-value">{{ item.available_rent_bikes }}
                                                            </div>
                                                            <div class="stat-desc"></div>
                                                        </div>
                                                    </div>
                                                    <div class="stats shadow">
                                                        <div class="stat">
                                                            <div class="stat-title">地點</div>
                                                            <div class="stat-value">{{ item.ar }}</div>
                                                            <div class="stat-desc"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <button class="btn btn-square btn-ghost" @click="addMyFavorite(item.sno!)">
                                                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24">
                                                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2"
                                                        fill="none" stroke="currentColor">
                                                        <path
                                                            :d="getSvgIcon('love')">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>
                        <template v-else-if="tab.contentType === 'myFavorite'">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>站名</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in myFavorite">
                                        <td>
                                            <div class="bg-base-100 border-base-300 collapse border">
                                                <input type="checkbox" class="peer" />
                                                <div
                                                    class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                                    {{ item.sna }}
                                                </div>
                                                <div
                                                    class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                                    <div class="stats shadow">
                                                        <div class="stat">
                                                            <div class="stat-title">場站目前車輛數量</div>
                                                            <div class="stat-value">{{ item.available_rent_bikes }}
                                                            </div>
                                                            <div class="stat-desc"></div>
                                                        </div>
                                                    </div>
                                                    <div class="stats shadow">
                                                        <div class="stat">
                                                            <div class="stat-title">地點</div>
                                                            <div class="stat-value">{{ item.ar }}</div>
                                                            <div class="stat-desc"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <button class="btn btn-square btn-ghost" @click="removeMyFavorite(item.sno!)">
                                                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24">
                                                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2"
                                                        fill="none" stroke="currentColor">
                                                        <path
                                                            :d="getSvgIcon('delete')">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { getSvgIcon } from '../config/svg';
import type { SvgIconName } from '../config/svg';
import { showToast } from '@/composables/useToast';

const tooltipToggle = ref(false);
const searchText = ref('復興南路');
const searchResult = ref<Array<{ sno?: string, sna?: string, ar?: string, act?: string, available_rent_bikes?: number }>>([]);
const loadingSearch = ref(false);
const Search = () => {
    if (!searchText.value.trim()) {
        tooltipToggle.value = true;
        return;
    }

    tooltipToggle.value = false;
    loadingSearch.value = true;

    searchResult.value = data.value.filter((d) => d['ar']?.includes(searchText.value) || d['sarea']?.includes(searchText.value) || d['sna']?.includes(searchText.value))
    showToast('搜尋成功', 2);

    loadingSearch.value = false;
}


const data = ref<Array<{ sna?: string, sarea?: string, ar?: string }>>([]);
const disabled = ref(false);
const loadingGetData = ref(false);
const getData = async () => {
    disabled.value = true;
    loadingGetData.value = true;

    data.value.length = 0;
    searchResult.value.length = 0;

    const ubikeUrl: string = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json';
    await axios.get(ubikeUrl)
        .then((res) => {
            console.log(res);
            data.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        })

    if (searchText.value.trim()) {
        Search();
    }

    loadingGetData.value = false;
    disabled.value = false;
}

const tabManager: { title: string, svg: SvgIconName, contentType: string }[] = [
    {
        title: 'Live',
        svg: 'live',
        contentType: 'searchResult',
    },
    {
        title: 'Love',
        svg: 'love',
        contentType: 'myFavorite',
    }
]

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

const getFavoriteData = () => {
    myFavorite.value = JSON.parse(localStorage.getItem('myFavorite')!) || [];
}

onMounted(() => {
    getData();
    getFavoriteData();
})
</script>

<style scoped></style>
