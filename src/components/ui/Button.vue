<template>
  <button
    :class="[
      'px-4 py-2 rounded font-semibold transition',
      btnColor || 'bg-blue-600',
      textColor || 'text-white',
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  btnColor: String,
  textColor: String,
  disabled: Boolean
})
</script>

<style scoped>
.btn {
  background-color: var(--btn-bg);
  color: var(--btn-text);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s ease;
}
.btn:hover {
  filter: brightness(90%);
}
</style>
