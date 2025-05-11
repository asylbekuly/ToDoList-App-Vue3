<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import { isActivitiesValid, isActivityValid } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivitiesValid,
  },
})
const emit = defineEmits({
  'create-activity': isActivityValid,
  'delete-activity': isActivityValid,
})
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length>0" class="divide-y divide-gray-200 grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @delete="emit('delete-activity', activity)"
      />
    </ul>
    <TheActivitiesEmptyState v-else/>
    <TheActivityForm @submit="emit('create-activity', $event)" />
  </div>
</template>