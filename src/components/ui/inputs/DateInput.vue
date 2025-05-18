<template>
    <v-menu v-model="menu" transition="scale-transition" offset-y>
      <!-- Remove the debug line "{{ activatorProps }}" -->
      <template v-slot:activator="{ props: activatorProps }">
        <v-text-field
          v-bind="activatorProps"
          v-model="displayDate"
          :label="config.label || 'Select Date'"
          :rules="rules"
          readonly
          outlined
          density="comfortable"
          class="input-control"
          @click="menu = true"
        />
      </template>
      <v-date-picker
        v-model="internalValue"
        @change="menu = true"
        :max="config.attrs?.max"
        :min="config.attrs?.min"
        persistent-placeholder
        class="input-control"
      />
      <!-- Optionally remove or place this date input elsewhere unless required -->
      <v-date-input
        label="Date of birth"
        prepend-icon=""
        variant="outlined"
        persistent-placeholder
      ></v-date-input>
    </v-menu>
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
  
  const menu = ref(false)
  
  const displayDate = computed({
    get() {
      if (!internalValue.value) return ''
      const date = new Date(internalValue.value)
      return isNaN(date.getTime())
        ? internalValue.value
        : date.toLocaleDateString()
    },
    set(newDisplay) {
      const parsedDate = new Date(newDisplay)
      if (!isNaN(parsedDate.getTime())) {
        internalValue.value = parsedDate.toISOString().split('T')[0]
      } else if (!newDisplay) {
        internalValue.value = ''
      }
    }
  })
  </script>
  
  <style scoped>
  .input-control {
    width: 100%;
  }
  </style>
  