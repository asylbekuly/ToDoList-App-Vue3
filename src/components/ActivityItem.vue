<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import {  BUTTON_TYPE_DANGER } from '@/constants'
import { isActivityValid } from '@/validators'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'
import { inject } from 'vue'
import {
  setActivitySecondsToCompleteKey,
  deleteActivityKey,
  periodSelectOptionsKey,
} from '@/keys'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})


const setActivitySecondsToComplete = inject(setActivitySecondsToCompleteKey)
const deleteActivity = inject(deleteActivityKey)
const PeriodSelectOptions = inject(periodSelectOptionsKey)
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-3">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8 cursor-pointer" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono text-2xl grow"
        placeholder="h:mm"
        :selected="activity.secondsToComplete || null"
        :options="PeriodSelectOptions"
        @select="setActivitySecondsToComplete(activity, $event || 0)"
      />
      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>