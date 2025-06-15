<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECOND,
} from '@/constants'
import { isTimelineItemValid } from '@/validators'
import { ref, watch } from 'vue'
import { currentHour, formatSeconds } from '@/functions'
import { updateTimelineItem } from '@/timeline-items'
const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)
let interval = null
watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItem(props.timelineItem, {activitySeconds: seconds.value})
  },
)

function start() {
  if (!isRunning.value) {
    isRunning.value = true
    interval = setInterval(() => {
      updateTimelineItem(props.timelineItem, {activitySeconds: props.timelineItem.activitySeconds + 1})
      seconds.value++
    }, MILLISECONDS_IN_SECOND)
  }
}

function stop() {
  clearInterval(interval)
  isRunning.value = false
}

function reset() {
  stop()
  updateTimelineItem(
    props.timelineItem,
    {updateTimelineItem: props.timelineItem.activitySecond - seconds.value},
  )
  seconds.value = 0
}
const isStartButtonDisabled = props.timelineItem.hour !== currentHour()
</script>
<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" class="h-8 cursor-pointer" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-2xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" class="h-8 cursor-pointer" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <BaseIcon :name="ICON_PLAY" class="h-8 cursor-pointer" />
    </BaseButton>
  </div>
</template>
