<script setup>
import { formatSecondsWithSign } from '@/functions'
import { isActivityValid } from '@/validators'
import { computed } from 'vue'
import { calculateTrackedeActivitySeconds, timelineItems } from '@/timeline-items'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const classes = computed(() => [
  'flex items-center rounded px-2 font-mono text-xl',
  remainingSeconds.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
])
const remainingSeconds = computed(
  () =>
    calculateTrackedeActivitySeconds(timelineItems.value, props.activity) -
    props.activity.secondsToComplete,
)
</script>
<template>
  <div :class="classes">
    {{ formatSecondsWithSign(remainingSeconds) }}
  </div>
</template>
