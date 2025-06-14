<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { nextTick, watchPostEffect } from 'vue'
import { PAGE_TIMELINE } from '@/constants'
import { curntPage } from '@/router'
import { scrollToCurrentHour,timelineItems,timelineItemRefs} from '@/timeline-items'
watchPostEffect(async () => {
  if (curntPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToCurrentHour(false)
  }
})


</script>

<template>
  <div class="mt-8">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
