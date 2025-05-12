<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeline from './pages/TheTimeline.vue';
import { generateTimelineItems, genereateActivitySelectOptions, genetateActivities } from '@/functions'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import { ref, computed } from 'vue'

const curntPage = ref(window.location.hash.replace('#', '') || PAGE_TIMELINE)


const activities = ref(genetateActivities())
const timelineItems = generateTimelineItems()
const activitySelectOptions = computed(() =>
  genereateActivitySelectOptions(activities.value)
)

function deleteActivity(activity){
  activities.value.splice(activities.value.indexOf(activity), 1)
}
function createActivity(activity){
  activities.value.push(activity)
}
</script>


<template>  
 <TheHeader @navigate="curntPage = $event"/>
  <main class="">
    <TheTimeline v-show="curntPage===PAGE_TIMELINE" :timeline-items="timelineItems" :activity-select-options="activitySelectOptions"/>
    <TheActivities  v-show="curntPage===PAGE_ACTIVITIES" :activities="activities" @delete-activity="deleteActivity" @create-activity="createActivity" />
    <TheProgress v-show="curntPage===PAGE_PROGRESS" />
  </main>
  <TheNav :curntPage="curntPage" @navigate="curntPage = $event"/>
</template>



