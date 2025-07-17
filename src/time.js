import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
} from '@/constants'
import { computed, ref } from 'vue'

export function today() {
  const today = new Date()
  // today.setHours(0, 0)
  return today
}
export function tomorrow() {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

export function EndOfHour(date) {
  const endOfHour = new Date(date)
  endOfHour.setTime(endOfHour.getTime + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)
  endOfHour.setMinutes(0, 0, 0)
  return endOfHour
}
export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export function toSeconds(milliseconds) {
  Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}
export const now = ref(today())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

let currentDateTimer = null

export function startCurrentDateTimer() {
  now.value = today()
  currentDateTimer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopCurrentDateTimer() {
  if (currentDateTimer) {
    clearInterval(currentDateTimer)
    currentDateTimer = null
  }
}
