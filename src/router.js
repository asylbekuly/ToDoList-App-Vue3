import { isPageValid } from '@/validators'
import { ref } from 'vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeline from './pages/TheTimeline.vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'

export const routes = {
  [PAGE_TIMELINE] : TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress
}

export const curntPage = ref(normalizePageHash())
export function navigate(page) {
  document.body.scrollIntoView({ behavior: 'smooth' })

  curntPage.value = page
}
export function normalizePageHash() {
  const page = window.location.hash.slice(1)

  if (isPageValid(page)) {
    return page
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}
