<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import { isTimelineItemValid, isUndefined } from '@/validators'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'
import { inject } from 'vue'
import { setTimelineItemActivityKey, activitySelectOptionsKey } from '@/keys'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})
const emit = defineEmits({
  scrollToHour: isUndefined,
})
const setTimelineItemActivity = inject(setTimelineItemActivityKey)
const activitySelectOptions = inject(activitySelectOptionsKey)
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopWatch :timelineItem="timelineItem"></TimelineStopWatch>
  </li>
</template>
