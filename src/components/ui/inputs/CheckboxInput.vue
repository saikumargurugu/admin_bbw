<template>
    <v-checkbox
      v-model="internalValue"
      :label="config.label"
      :value="config.value"
      v-bind="config.attrs"
      density="comfortable"
    />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: ''
    }
  })
  const emit = defineEmits(['update:modelValue'])
  
  const internalValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  </script>
  