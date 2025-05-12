<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import {
  validateSelectOptions,
  validateTimelineItems,
  isActivitiesValid,
  isTimelineItemValid,
  isActivityValid,
  isNull,
} from '../validators'
defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
  activities: {
    type: Array,
    required: true,
    validator: isActivitiesValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
})
const emit = defineEmits({
  setTimelineItemActivity({ timelineItem, activity }) {
    return [
      isTimelineItemValid(timelineItem),
      activity === null || isActivityValid(activity),
    ].every(Boolean)
  },
})
</script>

<template>
  <div class="mt-8">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activities="activities"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activity: $event })"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>