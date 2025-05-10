<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import { isActivitiesValid } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivitiesValid,
  },
})
</script>

<template>
  <div>
    <ul class="divide-y divide-gray-200">
      <ActivityItem v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>