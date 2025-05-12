import { MIDNIGHT_HOUR, nav_items,HOURS_IN_DAY,BUTTON_TYPES } from './constants'
export function isPageValid(page) {
  return Object.keys(nav_items).includes(page)
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
export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid)
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
export function isActivityValid(activity) {
  if (!activity || typeof activity !== 'object') return false;

  const { id, name, secondsToComplete } = activity;
  return (
    isNotEmptyString(id) &&
    isNotEmptyString(name) &&
    isNumber(secondsToComplete)
  );
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
