<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

</script>

<template>
      <a href="#">
      <div v-if="true" class="flex items-center justify-center gap-1">
        <p class="font-bold text-black">Day Complete!</p>
        <CheckCircleIcon class="h-6 w-6 text-green-500" />
      </div>
      <div v-else class="flex items-center justify-center gap-1">
        <div>Progress: <span class="font-mono">20%</span></div>
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
</template>