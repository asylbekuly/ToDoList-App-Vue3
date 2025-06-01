<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeline from './pages/TheTimeline.vue'
import {
  generateTimelineItems,
  genereateActivitySelectOptions,
  genetateActivities,
  generatePeriodSelectOptions,
} from '@/functions'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { ref, computed, provide, readonly } from 'vue'
import { curntPage, timelineRef } from './router'
import * as keys from './keys'

const activities = ref(genetateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => genereateActivitySelectOptions(activities.value))

function createActivity(activity) {
  activities.value.push(activity)
}
function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, deleteActivity)
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.timelineItemsKey, readonly(timelineItems.value))
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
