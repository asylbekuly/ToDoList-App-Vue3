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
} from '@/functions'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { ref, computed, provide } from 'vue'

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)

const activities = ref(genetateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => genereateActivitySelectOptions(activities.value))
const timeline = ref()
function goTo(page){
  if(curntPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE){
    timeline.value.scrollToHour()
  }
  if(page !== PAGE_TIMELINE){
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

function setTimelineItemActivity({ timelineItem, activity }) {
  timelineItem.activityId = activity.id
}
function updateTimelineItemActivitySeconds(timelineItem,activitySeconds){
  timelineItem.activitySeconds += activitySeconds
}
function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="">
    <TheTimeline
      v-show="curntPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activities="activities"
      :activity-select-options="activitySelectOptions"
      @set-timeline-item-activity="setTimelineItemActivity"
      :current-page="curntPage"
      ref="timeline"
    />

    <TheActivities
      v-show="curntPage === PAGE_ACTIVITIES"
      :activities="activities"
      :timeline-items="timelineItems"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
    />
    <TheProgress v-show="curntPage === PAGE_PROGRESS" />
  </main>
  <TheNav :curntPage="curntPage" @navigate="goTo($event)" />
</template>
