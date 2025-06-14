<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECOND,
} from '@/constants'
import { isTimelineItemValid } from '@/validators'
import { ref, watch } from 'vue'
import { currentHour, formatSeconds } from '@/functions'
import { updateTimelineItemActivitySeconds } from '@/timeline-items'
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
    updateTimelineItemActivitySeconds(props.timelineItem, seconds.value)
  },
)

function start() {
  if (!isRunning.value) {
    isRunning.value = true
    interval = setInterval(() => {
      updateTimelineItemActivitySeconds(props.timelineItem, props.timelineItem.activitySeconds + 1)
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
  updateTimelineItemActivitySeconds(
    props.timelineItem,
    props.timelineItem.activitySecond - seconds.value,
  )
  seconds.value = 0
}
const isStartButtonDisabled = props.timelineItem.hour !== currentHour()
</script>
<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-8 cursor-pointer" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-2xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8 cursor-pointer" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <PlayIcon class="h-8 cursor-pointer" />
    </BaseButton>
  </div>
</template>
