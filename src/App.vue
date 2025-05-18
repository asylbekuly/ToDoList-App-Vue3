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
import { ref, computed } from 'vue'

const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)

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

function setTimelineItemActivity({ timelineItem, activity }) {
  timelineItem.activityId = activity.id
}
function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}
</script>

<template>
  <TheHeader @navigate="curntPage = $event" />
  <main class="">
    <TheTimeline
      v-show="curntPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activities="activities"
      :activity-select-options="activitySelectOptions"
      @set-timeline-item-activity="setTimelineItemActivity"
    />

    <TheActivities
      v-show="curntPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
    />
    <TheProgress v-show="curntPage === PAGE_PROGRESS" />
  </main>
  <TheNav :curntPage="curntPage" @navigate="curntPage = $event" />
</template>
