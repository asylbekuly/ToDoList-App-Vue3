<script setup>
import TheHeaderProgress from './TheHeaderProgress.vue'
import { isPageValid } from '../validators'
import TheLogo from './TheLogo.vue'
import { PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'

// Объедините все события в одном defineEmits
const emit = defineEmits({
  goToTimeline: null,
  goToProgress: null,
  navigate: isPageValid
})
</script>

<template>
    <header class="flex sticky top-0 z-20 p-4 items-center justify-between bg-white border-b">
    <TheLogo @click="emit('navigate', PAGE_TIMELINE)" />
    <the-header-progress @click="emit('navigate', PAGE_PROGRESS)"/>
  </header>
</template>
