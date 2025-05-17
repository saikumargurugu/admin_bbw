<template>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <InputField
      v-for="field in config"
      :key="field.name || field.label"
      :config="field"
      :model-value="formData[field.name]"
      @update:modelValue="val => (formData[field.name] = val)"
    />
    <v-btn type="submit" color="primary">{{ submitLabel }}</v-btn>
  </v-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import InputField from './InputField.vue';
import Button from './Button.vue'; // Assuming you have a Button component

const props = defineProps({
  config: {
    type: Array,
    required: true,
  },
  initialValues: {
    type: Object,
    default: () => ({}),
  },
  submitLabel: {
    type: String,
    default: 'Submit',
  },
});

const emit = defineEmits(['submit']);
const form = ref(null);
const formData = reactive({});

// Initialize formData fields from config or initialValues
props.config.forEach((field) => {
  formData[field.name] = props.initialValues[field.name] || '';
});

async function handleSubmit() {
  if (form.value) {
    const { valid } = await form.value.validate();
    if (valid) {
      emit('submit', formData);
    } else {
      console.log('Form is invalid');
      // Optionally, provide user feedback that the form has errors
    }
  } else {
    // If form ref is not available, still emit (e.g., for simpler forms without validation)
    emit('submit', formData);
  }
}
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem 1.5rem;
}

/* Style for the submit button to span full width on mobile */
.v-btn[type="submit"] {
  grid-column: 1 / -1;
}

@media (max-width: 576px) {
  form {
    grid-template-columns: 1fr;
    gap: 1rem 0.5rem; /* Adjust gap for single column on mobile */
  }
}
</style>