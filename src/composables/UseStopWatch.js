import { ref, watch } from 'vue'
import { MILLISECONDS_IN_SECOND } from '@/constants'
import { updateTimelineItem } from '@/timeline-items'

export function UseStopwatch(timelineItem) {
  const seconds = ref(timelineItem.activitySeconds)
  const isRunning = ref(false)
  const temp = 120
  let interval = null
  watch(
    () => timelineItem.activityId,
    () => {
      updateTimelineItem(timelineItem, { activitySeconds: seconds.value })
    },
  )

  function start() {
    if (!isRunning.value) {
      isRunning.value = true
      interval = setInterval(() => {
        updateTimelineItem(timelineItem, {
          activitySeconds: timelineItem.activitySeconds + temp,
        })
        seconds.value += temp
      }, MILLISECONDS_IN_SECOND)
    }
  }

  function stop() {
    clearInterval(interval)
    isRunning.value = false
  }

  function reset() {
    stop()
    updateTimelineItem(timelineItem, {
      updateTimelineItem: timelineItem.activitySecond - seconds.value,
    })
    seconds.value = 0
  }
  return{
    seconds,
    isRunning,
    start,
    stop,
    reset,
  }
}
