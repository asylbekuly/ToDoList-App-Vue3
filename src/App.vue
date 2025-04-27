<script setup>
import TheHeader from './components/TheHeader.vue'  
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeline from './pages/TheTimeline.vue';
import { generateTimelineItems } from '@/functions'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { ref } from 'vue'
const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)

function goTo(page) {
  curntPage.value = page
  window.location.hash = page
}

const timelineItems = generateTimelineItems()
</script>


<template>
 <TheHeader  @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)"/>
  <main class="">
    <TheTimeline v-show="curntPage===PAGE_TIMELINE" :timeline-items="timelineItems" />
    <TheActivities  v-show="curntPage===PAGE_ACTIVITIES"/>
    <TheProgress v-show="curntPage===PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="curntPage" @navigate="curntPage = $event"/>
</template>



