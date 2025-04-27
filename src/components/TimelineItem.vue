<script setup>

import BaseSelect from './BaseSelect.vue'

const props = defineProps(['timelineItem'])

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.timelineItem.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
]

const options = [
  {value: 2, label: 'Work'}, 
  {value: 3, label: 'Exercise'},
  {value: 4, label: 'Study'},
  {value: 5, label: 'Relax'},
  {value: 6, label: 'Play'},
  {value: 7, label: 'Eat'},
  {value: 8, label: 'Sleep'},
]

const selectedActivityId = 2
</script>
 
 <template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <a href="#" :class="hourLinkClasses"> {{ props.timelineItem.hour }}:00 </a>
    <BaseSelect :selected="selectedActivityId" :options="options" :placeholder="'Rest'"/>
  </li>
</template>