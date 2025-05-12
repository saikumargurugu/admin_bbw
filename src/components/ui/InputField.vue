<template>
  <div class="input-field">
    <label :for="config.name" class="input-label">
      {{ config.label }}
    </label>
    <component
      :is="inputComponent"
      v-bind="config.attrs"
      v-model="localValue"
      class="input-control"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  config: Object,
  modelValue: [String, Number, Boolean, Array, Object],
});

const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

const inputComponent = computed(() => {
  return props.config.type === 'textarea' ? 'textarea' : 'input';
});
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.input-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff; /* Ensures the input has a white background instead of black */
}
</style>
