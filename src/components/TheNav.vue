<script setup>
import { NAV_ITEMS } from '@/constants'
import NavItem from './NavItem.vue'
</script>
<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around p-1 border-t">
      <NavItem v-for="navItem in NAV_ITEMS" :key="navItem.page" :nav-item="navItem"> </NavItem>
    </ul>
  </nav>
</template>
