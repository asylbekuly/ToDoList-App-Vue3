<script setup>
import { PAGE_TIMELINE } from '@/constants';
import { navigate } from '@/router'
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img src="../assets/image/logo.png" alt="Company Logo" class="h-10" />
  </a>
</template>