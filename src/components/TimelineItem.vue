<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import {
  isTimelineItemValid,
  isActivityValid,
  validateActivitySelectOptions,
  isActivitiesValid,
} from '@/validators'
import TimelineHour from './TimelineHour.vue'
import { NULLABLE_ACTIVITY } from '@/constants'
import TimelineStopWatch from './TimelineStopWatch.vue'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
  activities: {
    type: Array,
    required: true,
    validator: isActivitiesValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateActivitySelectOptions,
  },
})
const emit = defineEmits({
  selectActivity: isActivityValid
})
function findActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
function selectActivity(id) {
  emit(
    'selectActivity',
    id ? findActivityById(id) : NULLABLE_ACTIVITY,
  )
}

</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectActivity"
    />
    <TimelineStopWatch :seconds="timelineItem.activitySeconds"></TimelineStopWatch>
  </li>
</template>