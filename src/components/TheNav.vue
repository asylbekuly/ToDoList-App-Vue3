<script setup>
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'

import NavItem from './NavItem.vue'

const navItems = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon,
}
defineProps(['curntPage']); 

</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around p-4 border-t">
      <NavItem 
        v-for="(icon, page) in navItems" 
        :key="page" 
        :href="`#${page}`" 
        :class="{'bg-gray-100' : page === curntPage}"  
        @click="$emit('navigate', page)">
        <component :is="icon" class="h-6 w-6 text-gray-500" />
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>
