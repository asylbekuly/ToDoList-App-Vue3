<script>
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_PRIMARY, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants'
import { isButtonTypeValid } from '@/validators'

const typeclasses = {
  [BUTTON_TYPE_NEUTRAL]: 'bg-gray-300 enabled:hover:bg-gray-200 text-white',
  [BUTTON_TYPE_DANGER]: 'bg-red-500 enabled:hover:bg-red-400 text-white',
  [BUTTON_TYPE_PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-400 text-white',
  [BUTTON_TYPE_SUCCESS]: 'bg-green-500 enabled:hover:bg-green-400 text-white',
  [BUTTON_TYPE_WARNING]: 'bg-yellow-500 enabled:hover:bg-yellow-400 text-white',
}

</script>

<script setup>


const props = defineProps({
  type: {
    type: String,
    default: BUTTON_TYPE_PRIMARY,
    validator: isButtonTypeValid,
  },
})


</script>

<template>
  <button
    :class="`${
      typeclasses[props.type]
    } cursor-pointer rounded focus:outline-none focus:ring focus:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-50`"
    type="button"
  >
    <slot></slot>
  </button>
</template>
