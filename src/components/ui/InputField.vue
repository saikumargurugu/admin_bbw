<template>
  <div class="w-full text-black">
    <DateInput
      v-if="isDate"
      :config="config"
      v-model="localValue"
      :rules="dateRules"
    />
    <RadioGroupInput
      v-else-if="isRadio"
      :config="config"
      v-model="localValue"
      :rules="rules"
    />
    <CheckboxInput
      v-else-if="config.type === 'checkbox'"
      :config="config"
      v-model="localValue"
    />
    <CheckboxGroupInput
      v-else-if="config.type === 'checkbox-group'"
      :config="config"
      v-model="localValue"
      :rules="rules"
    />
    <TextInput
      v-else-if="!isTextarea && !isSelect"
      :config="config"
      v-model="localValue"
      :rules="rules"
    />
    <TextareaInput
      v-else-if="isTextarea"
      :config="config"
      v-model="localValue"
      :rules="rules"
    />
    <SelectInput
      v-else-if="isSelect"
      :config="config"
      v-model="localValue"
      :rules="rules"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import DateInput from './inputs/DateInput.vue'
import RadioGroupInput from './inputs/RadioGroupInput.vue'
import CheckboxInput from './inputs/CheckboxInput.vue'
import CheckboxGroupInput from './inputs/CheckboxGroupInput.vue'
import TextInput from './inputs/TextInput.vue'
import TextareaInput from './inputs/TextareaInput.vue'
import SelectInput from './inputs/SelectInput.vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get() {
    if (props.config.type === 'checkbox-group' && !Array.isArray(props.modelValue)) {
      return []
    }
    return props.modelValue
  },
  set: val => emit('update:modelValue', val)
})

const rules = ref([])
const dateRules = ref([])

const isTextarea = computed(() => props.config.type === 'textarea')
const isSelect = computed(() => props.config.type === 'select')
const isDate = computed(() => props.config.type === 'date')
const isRadio = computed(() => props.config.type === 'radio')
const isCheckboxGroup = computed(() => props.config.type === 'checkbox-group')

watch(
  () => props.config,
  (newConfig) => {
    rules.value = []
    dateRules.value = []

    if (newConfig.required) {
      rules.value.push((v) => !!v || 'This field is required')
      if (isDate.value) {
        dateRules.value.push((v) => !!v || 'Please select a date')
      }
      if (isCheckboxGroup.value) {
        dateRules.value.push(
          (v) =>
            (Array.isArray(v) && v.length > 0) || 'Please select at least one option'
        )
      }
    }
    if (isDate.value && newConfig.attrs?.min) {
      dateRules.value.push((v) => {
        if (!v) return true
        const selectedDate = new Date(v)
        const minDate = new Date(newConfig.attrs.min)
        return (
          selectedDate >= minDate ||
          `Date must be after or on ${minDate.toLocaleDateString()}`
        )
      })
    }
    if (isDate.value && newConfig.attrs?.max) {
      dateRules.value.push((v) => {
        if (!v) return true
        const selectedDate = new Date(v)
        const maxDate = new Date(newConfig.attrs.max)
        return (
          selectedDate <= maxDate ||
          `Date must be before or on ${maxDate.toLocaleDateString()}`
        )
      })
    }
    if (isRadio.value && newConfig.required) {
      rules.value.push((v) => !!v || 'Please select an option')
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.input-field {
  width: 100%;
  color: black;
}
</style>
