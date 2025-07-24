import { APP_NAME } from './constants.js'
import { tomorrow } from './time.js'
import {
  activeTimelineItem,
  initializeTimelineItems,
  startTimelineItemTimer,
  stopTimelineItemTimer,
  timelineItems,
} from './timeline-items.js'
import { activities, initializeActivities } from './activities.js'

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()
  if (activeTimelineItem.value) {
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
  }
}

function loadState() {
  const state = loadFromLocalStorage()
  initializeActivities(state)
  initializeTimelineItems(state)
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}

export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: tomorrow(),
    }),
  )
}
