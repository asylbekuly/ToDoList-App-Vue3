<script setup>
import TheHeaderProgress from './TheHeaderProgress.vue'
import TheLogo from './TheLogo.vue'
const emit = defineEmits(['goToTimeline', 'goToProgress'])
</script>


<template>
    <header class="flex sticky top-0 z-20 p-4 items-center justify-between bg-white border-b">
    <TheLogo @click="emit('goToTimeline')" />
    <the-header-progress @click="emit('goToProgress')"/>
  </header>
</template>