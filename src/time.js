import { HUNDRED_PERCENT, MILLISECONDS_IN_SECOND, SECONDS_IN_DAY } from '@/constants'
import { computed, ref } from 'vue'

export const now = ref(new Date())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

let timer = null

export function startTimer() {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND * 5 * 60)
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
