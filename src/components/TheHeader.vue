<script setup>
import TheHeaderProgress from './TheHeaderProgress.vue'
import TheLogo from './TheLogo.vue'
</script>

<template>
  <header class="flex sticky top-0 z-20 p-4 items-center justify-between bg-white border-b">
    <TheLogo />
    <the-header-progress />
  </header>
</template>
