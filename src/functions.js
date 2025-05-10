import { HOURS_IN_DAY, MIDNIGHT_HOUR} from './constants.js'
export function generateTimelineItems() {
    const timelineItems = []
    for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
      timelineItems.push({ hour })
    }
    return timelineItems
  }