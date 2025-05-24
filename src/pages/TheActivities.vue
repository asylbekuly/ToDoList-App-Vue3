<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import { isActivitiesValid, isActivityValid, isNumber } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivitiesValid,
  },
})
const emit = defineEmits({
  setActivitySecondsToComplete(activity, secondsToComplete) {
    return [
      isActivityValid(activity),
      isNumber(secondsToComplete),
    ].every(Boolean)
  },
  'create-activity': isActivityValid,
  'delete-activity': isActivityValid,
})

function setSecondsToComplete(activity, secondsToComplete) {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length > 0" class="divide-y divide-gray-200 grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @delete="emit('delete-activity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('create-activity', $event)" />
  </div>
</template>