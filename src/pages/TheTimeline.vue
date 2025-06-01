<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { validateTimelineItems } from '../validators'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import { curntPage } from '@/router'
defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
})
defineExpose({
  scrollToHour,
})
const timelineItemRefs = ref([])
watchPostEffect(async () => {
  if (curntPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null)
  }
})

function scrollToHour(hour = null) {
  hour ??= new Date().getHours()

  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
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
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
