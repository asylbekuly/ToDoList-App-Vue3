import { MIDNIGHT_HOUR, nav_items,HOURS_IN_DAY } from './constants'
export function isPageValid(page) {
  return Object.keys(nav_items).includes(page)
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
function isSelectOptionValid({value, label}) {
   return isNumber(value) && isString(label) 
}
export function isNumberOrNull(value){
  return isNumber(value) || isNull(value);
}
function isNull(value){
  return value === null;
}
function isUndefined(value){
  return value === undefined;
}
function isNumber(value){
  return typeof value === 'number';
}
function isBetween(value,start,end){
  return value >= start && value <= end
}
function isValidHour(hour){
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY-1)
} 
function isString(value){
  return typeof value === 'string';
}