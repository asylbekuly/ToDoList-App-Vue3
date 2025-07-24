<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_X_MARK } from '@/icons'
import { BUTTON_TYPE_NEUTRAL } from '@/constants'
import { validateSelectOptions, isSelectValueValid } from '@/validators'
import { normalizeSelectValue } from '@/functions'
defineProps({
  options: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  selected: [String, Number, null],
  placeholder: {
    type: String,
    default: 'Rest',
  },
})
const emit = defineEmits({
  select: isSelectValueValid,
})
function select(value) {
  emit('select', normalizeSelectValue(value))
}
</script>

<template>
  <div class="flex items-center gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
      <BaseIcon :name="ICON_X_MARK" />
    </BaseButton>
    <select
      class="w-full rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
      @change="select($event.target.value)"
    >
      <option selected disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === selected"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
