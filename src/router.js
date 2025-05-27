import { PAGE_TIMELINE } from '@/constants'
import { ref } from 'vue'

export const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)
