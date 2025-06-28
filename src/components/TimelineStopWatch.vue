<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { UseStopwatch } from '@/composables/UseStopWatch'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants'
import { isTimelineItemValid } from '@/validators'
import { currentHour, formatSeconds } from '@/functions'
const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const { seconds, isRunning, start, stop, reset } = UseStopwatch(props.timelineItem)
</script>
<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-2xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="props.timelineItem.hour !== currentHour()"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
