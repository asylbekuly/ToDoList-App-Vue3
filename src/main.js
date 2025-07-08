import './assets/main.css'
import * as storage from './storage.js'

import { createApp } from 'vue'
import App from './App.vue'
import { timelineItems } from './timeline-items'
import { activities } from './activities'

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    saveState()
  }
})
function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value,
  })
}
createApp(App).mount('#app')
