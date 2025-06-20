import { id } from './functions'
import { ref, computed } from 'vue'
import { getTotalActivitySeconds } from '@/timeline-items'
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
export function getActivityProgress(activity) {
  const activitySeconds = getTotalActivitySeconds(activity)
  const percentage = (activitySeconds * 100) / activity.secondsToComplete
  return Math.floor(percentage)
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
