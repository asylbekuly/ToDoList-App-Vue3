<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { onActivated } from 'vue'
import { scrollToCurrentHour, timelineItems, timelineItemRefs } from '@/timeline-items'
import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue'

onActivated(scrollToCurrentHour)
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
