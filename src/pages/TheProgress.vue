<script setup>
import ProgressItem from '@/components/ProgressItem.vue'
import { trackedActivities } from '@/activities'
</script>
<template>
  <ul class="divide-y divide-neutral-300">
    <ProgressItem v-for="activity in trackedActivities" :key="activity" :activity="activity" />
  </ul>
</template>
