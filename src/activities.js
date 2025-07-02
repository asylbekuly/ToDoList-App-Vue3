import { id } from './functions'
import { ref, computed } from 'vue'
import { hundred_percent } from './constants'
export const activities = ref(generateActivities())

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)
export const activitySelectOptions = computed(() =>
  genereateActivitySelectOptions(activities.value),
)
export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}
export function createActivity(activity) {
  activities.value.push(activity)
}
export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
export function calculateActivityCompletionPercentage({secondsToComplete},trackedSeconds) {
  return Math.floor((trackedSeconds * hundred_percent)/secondsToComplete)
}
export function calculateCompletionPercentage(totalTrackedSeconds){
  return Math.floor((totalTrackedSeconds * hundred_percent)/ totalActivitySecondsToComplete.value)

}

function generateActivities() {
  return ['Coding', 'Reading', 'Writing'].map((name) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60,
  }))
}
function genereateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value.map(({ secondsToComplete }) => secondsToComplete).reduce(
    (total, seconds) => total + seconds,
    0,
  )
})