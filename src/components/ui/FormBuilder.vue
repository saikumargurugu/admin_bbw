<template>
  <form
    @submit.prevent="handleSubmit"
    class="grid gap-4 md:gap-x-6 md:grid-cols-2"
  >
    <InputField
      v-for="field in config"
      :key="field.name || field.label"
      :config="field"
      :model-value="formData[field.name]"
      @update:modelValue="val => (formData[field.name] = val)"
    />
    <Button
      type="submit"
      class="md:col-span-2 w-full mt-2"
      btnColor="bg-blue-600"
      textColor="text-white"
    >
      {{ submitLabel }}
    </Button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import InputField from './InputField.vue';
import Button from './Button.vue';

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
const formData = reactive({});

// Initialize formData fields from config or initialValues
props.config.forEach((field) => {
  formData[field.name] = props.initialValues[field.name] || '';
});

async function handleSubmit() {
  // If you have validation logic, add it here
  emit('submit', formData);
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