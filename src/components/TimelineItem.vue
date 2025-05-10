<script setup>
import BaseSelect from './BaseSelect.vue'
import { computed, ref } from 'vue'
import { isUndefinedOrNull } from '@/validators'
import TimelineHour from './TimelineHour.vue'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
  },
})

const options = [
  { value: 2, label: 'Work' },
  { value: 3, label: 'Exercise' },
  { value: 4, label: 'Study' },
  { value: 5, label: 'Relax' },
  { value: 6, label: 'Play' },
  { value: 7, label: 'Eat' },
  { value: 8, label: 'Sleep' },
]

const selectedActivityId = ref()
const isNotSelected = computed(() => isUndefinedOrNull(selectedActivityId.value))
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="props.timelineItem.hour" />
    <BaseSelect
      :selected="selectedActivityId"
      :options="options"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
