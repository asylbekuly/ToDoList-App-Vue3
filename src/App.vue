<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeline from './pages/TheTimeline.vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { curntPage, timelineRef } from './router'


</script>

<template>
  <TheHeader />
  <main class="">
    <TheTimeline v-show="curntPage === PAGE_TIMELINE" ref="timelineRef" />
    <TheActivities v-show="curntPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="curntPage === PAGE_PROGRESS" />
  </main>
  <TheNav />
</template>
