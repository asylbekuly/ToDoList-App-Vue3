import { APP_NAME } from './constants.js'
import { today } from './time.js'




export function load() {
  const state = localStorage.getItem(APP_NAME)

  return state ? JSON.parse(state) : {}
}
export function save(data) {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      ...data,
      date: today().toDateString(),
    }),
  )
}
