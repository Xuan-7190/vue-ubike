<template>
  <Teleport to="body">
    <div v-if="visible" class="toast">
      <div :class="['alert', typeClass]">
        <span>{{ message }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastState } from '../composables/useToast'

const { visible, message, typeClass } = useToastState()
</script>
