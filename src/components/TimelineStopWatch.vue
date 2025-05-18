<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, MILLISECONDS_IN_SECOND} from '@/constants'
import { isNumber, isValidHour } from '@/validators'
import {ref} from 'vue'
import { formatSeconds } from '@/functions'

const props = defineProps({
    seconds:{
        type: Number,
        required: true,
        validator: isNumber,
    },
    hour: {
        type: Number,
        required: true,
        validator: isValidHour,
    }
})
const seconds = ref(props.seconds)
const isRunning = ref(false)
let interval = null

function start(){
  if (!isRunning.value) {
    isRunning.value = true
    interval = setInterval(() => {
      seconds.value++
    }, MILLISECONDS_IN_SECOND)
  }
}

function stop(){
    clearInterval(interval)
    isRunning.value = false
}

function reset(){
  stop()
  seconds.value = props.seconds
}
const isStartButtonDisabled = props.hour !== new Date().getHours()

</script>
<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-8 cursor-pointer" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-2xl">
      {{formatSeconds(seconds)}}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8 cursor-pointer" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <PlayIcon class="h-8 cursor-pointer" />
    </BaseButton>
  </div>
</template>