<template>
  <div class="input-field">
    <div class="input-wrapper">
      <component
        :is="inputComponent"
        v-bind="config.attrs"
        v-model="localValue"
        :id="config.name"
        class="input-control"
        @focus="focused = true"
        @blur="focused = false"
      />
      <label
        :for="config.name"
        class="floating-label"
        :class="{ active: focused || localValue }"
      >
        {{ config.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  config: Object,
  modelValue: [String, Number, Boolean, Array, Object],
});
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const focused = ref(false);

const inputComponent = computed(() =>
  props.config.type === 'textarea' ? 'textarea' : 'input'
);
</script>

<style scoped>
.input-field {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
}

.input-wrapper {
  position: relative;
}

.input-control {
  width: 100%;
  padding: 1rem 0.75rem 0.5rem 0.75rem;
  font-size: 1rem;
  color: #000; /* Ensure input text is black */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
}

.input-control:focus {
  border-color: #2563eb;
}

.floating-label {
  position: absolute;
  left: 0.75rem;
  top: 1rem;
  color: #888;
  font-size: 1rem;
  pointer-events: none;
  transition: 0.2s ease all;
  background: #fff;
  padding: 0 0.25rem;
}

.floating-label.active {
  top: -0.6rem;
  font-size: 0.75rem;
  color: #2563eb;
}
</style>
