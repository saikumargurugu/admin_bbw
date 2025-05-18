<template>
    <v-radio-group
      v-model="internalValue"
      :label="config.label"
      :rules="rules"
      hide-details="auto"
      :id="config.name"
      v-bind="config.attrs"
      density="comfortable"
      class="input-control"
    >
      <v-radio
        v-for="option in config.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </v-radio-group>
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
  