<template>
  <form @submit.prevent="$emit('submit', formData)">
    <InputField
      v-for="field in config"
      :key="field.name || field.label"
      :config="field"
      :model-value="formData[field.name]"
      @update:modelValue="val => (formData[field.name] = val)"
    />
    <Button type="submit">{{ submitLabel }}</Button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import InputField from './InputField.vue'
import Button from './Button.vue'

const props = defineProps({
  config: {
    type: Array,
    required: true
  },
  initialValues: {
    type: Object,
    default: () => ({})
  },
  submitLabel: {
    type: String,
    default: 'Submit'
  }
})

// Create a reactive form data object based on the config
const formData = reactive({})

// Initialize formData fields from config or initialValues
props.config.forEach(field => {
  formData[field.name] = props.initialValues[field.name] || ''
})
</script>
