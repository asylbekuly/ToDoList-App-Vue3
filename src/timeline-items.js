import { computed, ref, watch } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECOND } from './constants.js'
import { isToday, toSeconds, today, EndOfHour, now } from './time.js'

export const timelineItems = ref([])
export const timelineItemRefs = ref([])
export const activeTimelineItem = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive),
)
export const timelineItemTimer = ref(false)

export function startTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { isActive: true })
  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1,
    })
  }, MILLISECONDS_IN_SECOND)
}
export function stopTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { isActive: false })
  clearInterval(timelineItemTimer.value)
  timelineItemTimer.value = false
}
export function resetTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, {
    activitySeconds: 0,
  })
  stopTimelineItemTimer(timelineItem)
}
watch(now, (after, before) => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer()
  }
  if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
    resetTimelineItems()
  }
})

export function initializeTimelineItems(state) {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}
export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
    }),
  )
}
export function calculateTrackedeActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}
function resetTimelineItems() {
  timelineItems.value.forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false,
    }),
  )
}
export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(today().getHours(), isSmooth)
}
export function scrollToHour(hour) {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}
function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, //[0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0, //[0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
    isActive: false,
  }))
}
function syncIdleSeconds(lastActiveAt) {
  updateTimelineItem(activeTimelineItem.value, {
    activitySeconds: activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt),
  })
}
function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(EndOfHour(lastActiveAt) - lastActiveAt)
}
