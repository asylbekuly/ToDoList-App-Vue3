<script setup>
import BaseSelect from './BaseSelect.vue'
import { computed, ref } from 'vue'
import { isUndefinedOrNull, validateActivitySelectOptions } from '@/validators'
import TimelineHour from './TimelineHour.vue'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateActivitySelectOptions,
  },
});

const selectedActivityId = ref(0)
const isNotSelected = computed(() => isUndefinedOrNull(selectedActivityId.value))
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="props.timelineItem.hour" />
    <BaseSelect
      :selected="selectedActivityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
