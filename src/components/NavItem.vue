<template>
  <li class="flex-1">
    <a class="flex flex-col items-center p-7" :href="$attrs.href">
      <slot></slot>
    </a>
  </li>
</template>
