<script setup>
import ProgressItem from '@/components/ProgressItem.vue';
import { trackedActivities } from '@/activities';
</script>
<template>
  <ul class="divide-y divide-neutral-300">
   <ProgressItem v-for="(activity,index) in trackedActivities" :key="activity" :index="index" :activity="activity" />
  </ul>
</template>
