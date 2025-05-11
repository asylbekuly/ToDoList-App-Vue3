
<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { nextTick, ref } from 'vue'
import { BUTTON_TYPE_PRIMARY } from '@/constants'
import { isActivityValid } from '@/validators'
const emit = defineEmits({
  submit: isActivityValid,
})
const newactivity = ref('')

async function submit() {
  if (newactivity.value.trim() === '') return
  emit('submit', newactivity.value)
  newactivity.value = ''
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="newactivity"
      placeholder="Add activity"
      class="border rounded w-full p-2 text-xl"
    />
    <BaseButton :type="BUTTON_TYPE_PRIMARY">
      <PlusIcon class="h-8 cursor-pointer" />
    </BaseButton>
  </form>
</template>