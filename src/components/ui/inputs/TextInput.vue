<template>
    <v-text-field
      v-model="internalValue"
      :rules="rules"
      hide-details="auto"
      :label="config.label || 'Main input'"
      :id="config.name"
      v-bind="config.attrs"
      outlined
      density="comfortable"
      class="input-control"
      @focus="focused = true"
      @blur="focused = false"
    />
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: ''
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
  const focused = ref(false)
  </script>
  