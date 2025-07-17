<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { onActivated, onDeactivated } from 'vue'
import { scrollToCurrentHour, timelineItems, timelineItemRefs, stopTimelineItemTimer } from '@/timeline-items'
import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue'
import {startCurrentDateTimer, stopCurrentDateTimer } from '@/time'

stopTimelineItemTimer()
onActivated(() => {
  scrollToCurrentHour(), startCurrentDateTimer()
})
onDeactivated(stopCurrentDateTimer)
</script>

<template>
  <div class="relative mt-8">
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
  