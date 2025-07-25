import { ref, computed } from 'vue'
import { HUNDRED_PERCENT } from './constants'
export const activities = ref([])

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)
export const activitySelectOptions = computed(() =>
  genereateActivitySelectOptions(activities.value),
)
export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}
export function initializeActivities(state) {
  activities.value = state.activities || []
}
export function createActivity(activity) {
  activities.value.push(activity)
}
export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}
export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

function genereateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})
