import { normalizePageHash } from './functions'
import { ref } from 'vue'
import { PAGE_TIMELINE } from '@/constants'

export const curntPage = ref(normalizePageHash())
export function navigate(page) {
  if (curntPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value.scrollToHour()
  }
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }
  curntPage.value = page
}
export const timelineRef = ref()