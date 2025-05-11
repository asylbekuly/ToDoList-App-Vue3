
<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constants'
import { ref } from 'vue'
import { isActivityValid, isUndefined } from '@/validators'


defineProps({
    activity: {
        type: Object,
        required: true,
        validator: isActivityValid,
    },
})

const emit = defineEmits({
    delete: isUndefined
})

const SecondsToComplete = ref(null);
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-3">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8 cursor-pointer" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div>
      <BaseSelect class="font-mono text-2xl" placeholder="h:mm" :selected="SecondsToComplete" :options="PERIOD_SELECT_OPTIONS"  @select="SecondsToComplete = $event"/>
    </div>
  </li>
</template>