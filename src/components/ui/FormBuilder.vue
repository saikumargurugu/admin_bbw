<template>
    <form @submit.prevent="$emit('submit', formData)">
      <InputField
        v-for="(field, i) in config"
        :key="i"
        :config="field"
        v-model="formData[field.name]"
      />
      <Button type="submit">{{ submitLabel }}</Button>
    </form>
  </template>
  
  <script setup>
  import InputField from './InputField.vue';
  import Button from './Button.vue';
  import { reactive } from 'vue';
  
  const props = defineProps({
    config: Array,
    initialValues: Object,
    submitLabel: {
      type: String,
      default: 'Submit',
    },
  });
  
  const formData = reactive({ ...props.initialValues });
  </script>
  