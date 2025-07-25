import { MIDNIGHT_HOUR,HOURS_IN_DAY,BUTTON_TYPES, NAV_ITEMS } from './constants'
import { ICONS } from './icons'
export function isPageValid(page) {
  return NAV_ITEMS.some(navItem => navItem.page === page)
}
export function isIconValid(icon){
  return Object.keys(ICONS).includes(icon)
}
export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem) && isPageValid(navItem.page)
} 
export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}
export function isTimelineItemValid({ hour }) {
  return isValidHour(hour)
}
export function validateSelectOptions(options){
    return options.every(isSelectOptionValid)  
}

export function isUndefinedOrNull(value){
  return isUndefined(value) || isNull(value);
}
export function isValidHour(hour){
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY-1)
} 
function isSelectOptionValid({value, label}) {
   return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label) 
}
export function isSelectValueValid(value){
  return isNumberOrNull(value) || isNotEmptyString(value);
}
export function isNumberOrNull(value){
  return isNumber(value) || isNull(value);
}
export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) {
    return true
  }

  return [
    isNotEmptyString(id),
    isNotEmptyString(name),
    isNumber(secondsToComplete),
  ].every(Boolean)
}

export function isUndefined(value){
  return value === undefined;
}
export function isActivitiesValid(activities){
  return activities.every(isActivityValid)
}
export function validateActivitySelectOptions(options){
  return options.every(isSelectOptionValid)
}
export function isNull(value){
  return value === null;
}

export function isNumber(value){
  return typeof value === 'number';
}
function isBetween(value,start,end){
  return value >= start && value <= end
}

export function isString(value){
  return typeof value === 'string';
}
export function isNotEmptyString(value){
  return isString(value) && value.length>0;
}
