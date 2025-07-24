<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import { isTimelineItemValid } from '@/validators'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'
import { activitySelectOptions } from '@/activities'
import { updateTimelineItem } from '@/timeline-items'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopWatch :timelineItem="timelineItem"></TimelineStopWatch>
  </li>
</template>
