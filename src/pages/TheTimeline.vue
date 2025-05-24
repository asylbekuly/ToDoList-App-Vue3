<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import {
  validateTimelineItems,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
} from '../validators'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
const props = defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid,
  },
})
const emit = defineEmits({
  setTimelineItemActivity({ timelineItem, activity }) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
})
defineExpose({
  scrollToHour,
})
const timelineItemRefs = ref([])
watchPostEffect( async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null)
  }
})

function scrollToHour(hour = null ) { 
  hour ??= new Date().getHours() 

  const options = { behavior:  'smooth' }
  
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options )
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView( options )
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
        ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activity: $event })"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>