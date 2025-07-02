import { computed } from 'vue'
import { getProgressColorClass } from '../functions'
import { calculateCompletionPercentage, trackedActivities } from '../activities'
import { timelineItems, calculateTrackedeActivitySeconds } from '../timeline-items'

export function useTotalProgress() {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedeActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete,
        ),
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  return {
    colorClass,
    percentage,
  }
}
