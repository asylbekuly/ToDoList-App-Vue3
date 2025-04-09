<script setup>
import{ClockIcon,ListBulletIcon,ChartBarIcon} from '@heroicons/vue/24/outline'
import NavItem from './NavItem.vue'
const navItems = {
  'timeing': ClockIcon,
  'activities': ListBulletIcon,
  'progress': ChartBarIcon
}
</script>



<template>
      <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around p-4 border-t">
      <NavItem v-for="(icon, page) in navItems" :key="page" :href="`#${page}`">
        <component :is="icon" class="h-6 w-6 text-gray-500" />
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>