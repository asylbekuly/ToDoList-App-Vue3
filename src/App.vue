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

const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)

const activities = ref(genetateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => genereateActivitySelectOptions(activities.value))
const timeline = ref()
function goTo(page) {
  if (curntPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  }
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }
  curntPage.value = page
}

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
  <TheHeader @navigate="goTo($event)" />
  <main class="">
    <TheTimeline
      v-show="curntPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="curntPage"
      ref="timeline"
    />

    <TheActivities v-show="curntPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="curntPage === PAGE_PROGRESS" />
  </main>
  <TheNav :curntPage="curntPage" @navigate="goTo($event)" />
</template>
