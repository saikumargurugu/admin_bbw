<template>
  <button
    :class="[
      'px-4 py-2 rounded font-semibold transition',
      btnColor || 'bg-blue-600',
      textColor || 'text-white',
      customClass,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :style="customStyle"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  btnColor: String,
  textColor: String,
  disabled: Boolean,
  class: {
    type: String,
    default: ''
  },
  style: {
    type: [String, Object],
    default: ''
  }
});

const customClass = props.class;
const customStyle = props.style;
</script>

