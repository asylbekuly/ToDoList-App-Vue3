<script setup>
import { PAGE_TIMELINE } from '@/constants';

</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img src="../assets/image/logo.png" alt="Company Logo" class="h-10" />
  </a>
</template>