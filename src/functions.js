import { HOURS_IN_DAY, SECONDS_IN_HOUR, SECONDS_IN_MINUTE, MINUTES_IN_HOUR, MILLISECONDS_IN_SECOND } from './constants.js'
import { isNull } from './validators'

export function genetateActivities() {
  return ['Coding', 'Reading', 'Writing'].map((name,hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}

export function generateTimelineItems(activities){
    return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
      hour,
      activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
      activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
    }));  
  }
export function generatePeriodSelectOptions(periodsInMinutes) {
  return periodsInMinutes.map(periodInMinutes => ({
    value: periodInMinutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(periodInMinutes),
  }))  
}
function generatePeriodSelectOptionsLabel(periodInMinutes) {
  const hours = Math.floor(periodInMinutes / MINUTES_IN_HOUR)
  const minutes = periodInMinutes % MINUTES_IN_HOUR
  return `${hours}:${minutes.toString().padStart(2, '0')}`
}
export function normalizeSelectValue(value){
  return isNaN(value) || isNull(value) ? value : +value
}

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
export function formatSeconds(seconds){
    const date = new Date()
    date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)
    const utc =  date.toUTCString()
    return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}
export function genereateActivitySelectOptions(activities) {
  return activities.map(activity => ({ label: activity.name, value: activity.id }))
}
