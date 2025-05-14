<template>
  <div class="input-field">
    <!-- Regular text input -->
    <v-text-field
      v-if="!isTextarea && !isSelect"
      v-model="localValue"
      :rules="rules"
      hide-details="auto"
      :label="config.label || 'Main input'"
      :id="config.name"
      v-bind="config.attrs"
      outlined
      density="comfortable"
      class="input-control"
      @focus="focused = true"
      @blur="focused = false"
    />

    <!-- Textarea input -->
    <v-textarea
      v-else-if="isTextarea"
      v-model="localValue"
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

    <!-- Select input -->
    <v-select
      v-else-if="isSelect"
      v-model="localValue"
      :items="config.options || []"
      :rules="rules"
      hide-details="auto"
      :label="config.label"
      :id="config.name"
      v-bind="config.attrs"
      item-title="label"
      item-value="value"
      outlined
      density="comfortable"
      class="input-control"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
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
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const rules = ref([])
const focused = ref(false)

const isTextarea = computed(() => props.config.type === 'textarea')
const isSelect = computed(() => props.config.type === 'select')
</script>

<style scoped>
.input-field {
  width: 100%;
  margin-bottom: 2rem;
}

.input-control {
  width: 100%;
}
</style>
