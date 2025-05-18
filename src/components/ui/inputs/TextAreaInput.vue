<template>
    <v-textarea
      v-model="internalValue"
      :rules="rules"
      hide-details="auto"
      :label="config.label"
      :id="config.name"
      v-bind="config.attrs"
      outlined
      auto-grow
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
  