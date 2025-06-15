<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants'
import { isActivityValid } from '@/validators'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_TRASH } from '@/icons'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'
import { updateActivity, deleteActivity } from '@/activities'
import { resetTimelineItemActivities } from '@/timeline-items'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

function deleteAndresetActivity(activity) {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
}
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-3">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndresetActivity(activity)">
        <BaseIcon :name="ICON_TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono text-2xl grow"
        placeholder="h:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELECT_OPTIONS"
        @select="updateActivity(activity, {secondsToComplete: $event || 0})"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
