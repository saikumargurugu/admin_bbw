<template>
  <v-select
    v-model="internalValue"
    :items="selectOptions"
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
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import api from '@/api'

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
const focused = ref(false)

const selectOptions = ref(props.config.options || [])

async function fetchOptions() {
  if (props.config.url) {
    const data = await api.get(props.config.url)
    // Map to { label, value } for v-select
    selectOptions.value = data.map(opt => ({
      label: opt[props.config.optionLabel || 'name'],
      value: opt[props.config.optionValue || 'id']
    }))
  } else if (props.config.options) {
    selectOptions.value = props.config.options.map(opt => ({
      label: opt[props.config.optionLabel || 'name'],
      value: opt[props.config.optionValue || 'id']
    }))
  }
}

onMounted(fetchOptions)
watch(() => props.config.url, fetchOptions)
watch(() => props.config.options, fetchOptions)
</script>
