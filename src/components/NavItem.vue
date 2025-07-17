<script setup>
import { navigate, curntPage } from '@/router'
import BaseIcon from '@/components/BaseIcon.vue'
import { isNavItemValid } from '@/validators'
import { computed } from 'vue'
import { scrollToCurrentHour } from '@/timeline-items'
import { PAGE_TIMELINE } from '@/constants'

const props = defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid,
  },
})
const classes = computed(() => [
  'flex-1',
  'flex',
  'flex-col',
  'items-center',
  'p-7',
  props.navItem.page === curntPage.value ? 'bg-yellow-200' : 'hover:bg-yellow-100',
])

function handleClick() {
  curntPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page);
}
</script>
<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="navItem.icon" class="h-6 w-6 text-gray-500" /> {{ navItem.page }}
    </a>
  </li>
</template>
