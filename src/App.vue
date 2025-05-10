<script setup>
import TheHeader from './components/TheHeader.vue'  
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeline from './pages/TheTimeline.vue';
import { generateTimelineItems , genereateActivitySelectOptions } from '@/functions'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { ref } from 'vue'
const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)


const activities = ['Coding', 'Reading', 'Writing']
const timelineItems = generateTimelineItems()
const activitySelectOptions = genereateActivitySelectOptions(activities)
</script>


<template>  
 <TheHeader @navigate="curntPage = $event"/>
  <main class="">
    <TheTimeline v-show="curntPage===PAGE_TIMELINE" :timeline-items="timelineItems" :activity-select-options="activitySelectOptions"/>
    <TheActivities  v-show="curntPage===PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="curntPage===PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="curntPage" @navigate="curntPage = $event"/>
</template>



