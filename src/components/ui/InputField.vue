<template>
  <div class="input-field">
    <v-menu v-if="isDate" v-model="menu" transition="scale-transition" offset-y>
      <template v-slot:activator="{ props }">
        <v-text-field v-bind="props" v-model="displayDate" :label="config.label || 'Select Date'" :rules="dateRules"
          readonly outlined density="comfortable" class="input-control" @click="menu = true" />
      </template>
      <v-date-picker v-model="localValue" @update:modelValue="menu = false" :max="config.attrs?.max"
        :min="config.attrs?.min" class="input-control" />
    </v-menu>

    <v-radio-group v-else-if="isRadio" v-model="localValue" :label="config.label" :rules="rules" hide-details="auto"
      :id="config.name" v-bind="config.attrs" density="comfortable" class="input-control">
      <v-radio v-for="option in config.options" :key="option.value" :label="option.label" :value="option.value" />
    </v-radio-group>

    <v-checkbox v-else-if="config.type === 'checkbox'" v-model="localValue" :label="config.label" :value="config.value"
      v-bind="config.attrs" density="comfortable" />

    <!-- For checkbox groups -->
    <div v-else-if="config.type === 'checkbox-group'" class="d-flex flex-column">
      <v-label class="mb-2">{{ config.label }}</v-label>
      <v-checkbox v-for="option in config.options || []" :key="option.value" v-model="localValue" :label="option.label"
        :value="option.value" v-bind="config.attrs" density="comfortable" />
    </div>


    <v-text-field v-else-if="!isTextarea && !isSelect" v-model="localValue" :rules="rules" hide-details="auto"
      :label="config.label || 'Main input'" :id="config.name" v-bind="config.attrs" outlined density="comfortable"
      class="input-control" @focus="focused = true" @blur="focused = false" />

    <v-textarea v-else-if="isTextarea" v-model="localValue" :rules="rules" hide-details="auto" :label="config.label"
      :id="config.name" v-bind="config.attrs" outlined auto-grow density="comfortable" class="input-control"
      @focus="focused = true" @blur="focused = false" />

    <v-select v-else-if="isSelect" v-model="localValue" :items="config.options || []" :rules="rules" hide-details="auto"
      :label="config.label" :id="config.name" v-bind="config.attrs" item-title="label" item-value="value" outlined
      density="comfortable" class="input-control" @focus="focused = true" @blur="focused = false" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
});

const emit = defineEmits(['update:modelValue']);

// Two-way binding for v-model
const localValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});

const rules = ref([]);
const dateRules = ref([]);
const focused = ref(false);
const menu = ref(false); // Controls the v-menu popup for the date picker

// Determine the type of input to render
const isTextarea = computed(() => props.config.type === 'textarea');
const isSelect = computed(() => props.config.type === 'select');
const isDate = computed(() => props.config.type === 'date');
const isRadio = computed(() => props.config.type === 'radio');
const isCheckboxGroup = computed(() => props.config.type === 'checkbox-group');

// Format the date for the text field activator
const displayDate = computed({
  get() {
    if (!localValue.value) return '';
    const date = new Date(localValue.value);
    return isNaN(date.getTime()) ? localValue.value : date.toLocaleDateString();
  },
  set(newDisplayDate) {
    // Attempt to parse the manually entered date
    const parsedDate = new Date(newDisplayDate);
    if (!isNaN(parsedDate.getTime())) {
      localValue.value = parsedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    } else if (!newDisplayDate) {
      localValue.value = '';
    }
    // If parsing fails, the date picker will handle the valid selection
  },
});

// Update rules whenever the config changes
watch(
  () => props.config,
  (newConfig) => {
    rules.value = [];
    dateRules.value = [];

    // Add required rule if config.required is true
    if (newConfig.required) {
      rules.value.push((v) => !!v || 'This field is required');
      if (isDate.value) {
        dateRules.value.push((v) => !!v || 'Please select a date');
      }
      if (isCheckboxGroup.value) {
        dateRules.value.push((v) => (Array.isArray(v) && v.length > 0) || 'Please select at least one option');
      }
    }

    // Add min date validation for date picker
    if (isDate.value && newConfig.attrs?.min) {
      dateRules.value.push((v) => {
        if (!v) return true; // Allow empty if not required
        const selectedDate = new Date(v);
        const minDate = new Date(newConfig.attrs.min);
        return selectedDate >= minDate || `Date must be after or on ${minDate.toLocaleDateString()}`;
      });
    }

    // Add max date validation for date picker
    if (isDate.value && newConfig.attrs?.max) {
      dateRules.value.push((v) => {
        if (!v) return true; // Allow empty if not required
        const selectedDate = new Date(v);
        const maxDate = new Date(newConfig.attrs.max);
        return selectedDate <= maxDate || `Date must be before or on ${maxDate.toLocaleDateString()}`;
      });
    }

    // Add validation for radio buttons (only required)
    if (isRadio.value && newConfig.required) {
      rules.value.push((v) => !!v || 'Please select an option');
    }
  },
  { immediate: true } // Run the watcher immediately on component mount
);
</script>

<style scoped>
.input-field {
  width: 100%;
  margin-bottom: 2rem;
}

.input-control {
  width: 100%;
}
.input-field { /* This is likely the root element of your InputField component */
  width: 100%;
  margin-bottom: 0.75rem; /* Adjust this value as needed. Was 2rem previously. */
                   /* The grid 'gap' in CreateUser.vue will also manage spacing. */
}
</style>