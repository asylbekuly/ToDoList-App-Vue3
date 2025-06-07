<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeline from './pages/TheTimeline.vue'
import { generatePeriodSelectOptions } from '@/functions'
import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete,
} from '@/activities'
import {
  setTimelineItemActivity,
  updateTimelineItemActivitySeconds,
  timelineItems,
  resetTimelineItemActivities,
} from '@/timeline-items'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { provide, readonly } from 'vue'
import { curntPage, timelineRef } from './router'
import * as keys from './keys'

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
})
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.timelineItemsKey, readonly(timelineItems))
</script>

<template>
  <TheHeader />
  <main class="">
    <TheTimeline
      v-show="curntPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />

    <TheActivities v-show="curntPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="curntPage === PAGE_PROGRESS" />
  </main>
  <TheNav />
</template>
