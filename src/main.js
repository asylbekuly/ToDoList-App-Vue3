import './assets/main.css'
import * as storage from './storage.js'

import { createApp } from 'vue'
import App from './App.vue'
import { timelineItems } from './timeline-items'
import { activities } from './activities'
import { isToday } from './time'

loadState()
document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})
function loadState() {
  const state = storage.load()
  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value
  activities.value = state.activities || activities.value
}
function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value,
  })
}
createApp(App).mount('#app')
