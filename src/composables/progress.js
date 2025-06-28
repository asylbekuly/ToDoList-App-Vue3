import { computed } from 'vue'
import { getProgressColorClass } from '../functions'
import { calculateActivityCompletionPercentage } from '../activities'
import { timelineItems, calculateTrackedeActivitySeconds } from '../timeline-items'

export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedSeconds.value)
  )

  const trackedSeconds = computed(() =>
    calculateTrackedeActivitySeconds(timelineItems.value, activity)
  )

  return {
    colorClass,
    percentage,
    trackedSeconds
  }
}