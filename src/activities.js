import { SECONDS_IN_HOUR } from './constants'
import { id } from './functions'
import { ref, computed } from 'vue'

export const activities = ref(generateActivities())
export const trackedActivities = computed(() =>
  activities.value.filter(({secondsToComplete}) => secondsToComplete),
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

function generateActivities() {
  return ['Coding', 'Reading', 'Writing'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}
function genereateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}
