<template>
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
                        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                                stroke="currentColor">
                                <path :d="getSvgIcon('delete')">
                                </path>
                            </g>
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getSvgIcon } from '../config/svg';
import { useMyFavoriteStore } from '@/stores/MyFavoriteStore';

const { myFavorite } = storeToRefs(useMyFavoriteStore());
const { removeMyFavorite } = useMyFavoriteStore();
</script>

<style scoped></style>