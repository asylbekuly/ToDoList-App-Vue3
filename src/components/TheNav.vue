<script setup>
import {nav_items} from '@/constants'
import NavItem from './NavItem.vue'


defineProps(['curntPage']); 
</script>
<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around p-1 border-t">
      <NavItem 
        v-for="(icon, page) in nav_items" 
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
