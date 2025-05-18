<template>
    <div class="d-flex flex-column">
      <v-label class="mb-2">{{ config.label }}</v-label>
      <v-checkbox
        v-for="option in config.options || []"
        :key="option.value"
        v-model="internalValue"
        :label="option.label"
        :value="option.value"
        v-bind="config.attrs"
        density="comfortable"
      />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(['update:modelValue'])
  
  const internalValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  </script>
  