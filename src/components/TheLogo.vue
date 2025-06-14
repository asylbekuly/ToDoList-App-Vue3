<script setup>
import { PAGE_TIMELINE } from '@/constants';
import { curntPage, navigate } from '@/router'
import { scrollToCurrentHour } from '@/timeline-items'

function handleClick(){
  curntPage.value === PAGE_TIMELINE ? scrollToCurrentHour() : navigate(PAGE_TIMELINE);
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img src="../assets/image/logo.png" alt="Company Logo" class="h-10" />
  </a>
</template>