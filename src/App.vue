<script setup>
import TheHeader from './components/TheHeader.vue'  
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeline from './pages/TheTimeline.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { ref } from 'vue'
const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)
</script>


<template>
 <TheHeader />
  <main class="flex flex-grow flex-col items-center justify-center p-4">
    <TheTimeline v-show="curntPage===PAGE_TIMELINE" />
    <TheActivities  v-show="curntPage===PAGE_ACTIVITIES"/>
    <TheProgress v-show="curntPage===PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="curntPage" @navigate="curntPage = $event"/>
</template>



