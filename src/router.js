import { isPageValid } from '@/validators'
import { ref } from 'vue'
import { PAGE_TIMELINE } from '@/constants'

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
