<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_PLUS } from '@/icons'
import { nextTick, ref } from 'vue'
import { BUTTON_TYPE_PRIMARY } from '@/constants'
import { id } from '@/functions'
import { createActivity } from '@/activities'
const name = ref('')

async function submit() {
  if (name.value.trim() === '') return
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0,
  })
  name.value = ''
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="name"
      placeholder="Add activity"
      class="border rounded w-full p-2 text-xl"
    />
    <BaseButton :type="BUTTON_TYPE_PRIMARY">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>
