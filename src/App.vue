<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import { routes, curntPage } from './router'
</script>

<template>
  <TheHeader />
  <main class="">
    <KeepAlive>
      <component :is="routes[curntPage]" />
    </KeepAlive>
  </main>
  <TheNav />
</template>
