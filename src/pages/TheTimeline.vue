<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import {
  validateSelectOptions,
  validateTimelineItems,
  isActivitiesValid,
  isTimelineItemValid,
  isActivityValid,
} from '../validators'
import { onMounted, ref } from 'vue'
import { MIDNIGHT_HOUR } from '@/constants'
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
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
})
const timelineItemRefs = ref([])
onMounted(scrollToCurrentTimelineitem)

function scrollToCurrentTimelineitem() {
  const currentHour = new Date().getHours()
  if (currentHour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView({ behavior: 'smooth' })
  } else {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="mt-8">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activities="activities"
        ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activity: $event })"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>