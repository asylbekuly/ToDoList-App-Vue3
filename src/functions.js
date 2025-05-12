import { HOURS_IN_DAY, MIDNIGHT_HOUR, SECONDS_IN_HOUR } from './constants.js'
import { isNull } from './validators'

export function genetateActivities() {
  return ['Coding', 'Reading', 'Writing'].map((name,hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}
export function normalizeSelectValue(value){
  return isNaN(value) || isNull(value) ? value : +value
}
export function generateTimelineItems() {
  const timelineItems = []
  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({ hour })
  }
  return timelineItems
}
export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
export function genereateActivitySelectOptions(activities) {
  return activities.map(activity => ({ label: activity.name, value: activity.id }))
}
