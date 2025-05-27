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
import { ref, computed, provide } from 'vue'
import {curntPage, navigate, timelineRef} from './router'

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

function setTimelineItemActivity({ timelineItem, activityId }) {
  timelineItem.activityId = activityId
}
function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}
provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
provide('activitySelectOptions', activitySelectOptions.value)
provide('PeriodSelectOptions', generatePeriodSelectOptions())
provide('timelineItems', timelineItems.value)
provide('activities', activities.value)
</script>

<template>
  <TheHeader @navigate="navigate($event)" />
  <main class="">
    <TheTimeline
      v-show="curntPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="curntPage"
      ref="timelineRef"
    />

    <TheActivities v-show="curntPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="curntPage === PAGE_PROGRESS" />
  </main>
  <TheNav :curntPage="curntPage" @navigate="navigate($event)" />
</template>
