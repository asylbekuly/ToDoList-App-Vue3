<script setup>
import BaseSelect from './BaseSelect.vue'
import {
  isTimelineItemValid,
  isActivityValid,
  validateActivitySelectOptions,
  isActivitiesValid,
  isNull,
} from '@/validators'
import TimelineHour from './TimelineHour.vue'

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
  selectActivity(activity) {
    return isNull(activity) || isActivityValid(activity)
  },
})
function selectActivity(id) {
  emit(
    'selectActivity',
    id ? props.activities.find((activity) => activity.id === id) : null
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
  </li>
</template>