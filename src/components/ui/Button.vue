<template>
    <button
      :style="{ '--btn-bg': btnColor, '--btn-text': textColor }"
      class="btn"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    // Background color for the button; default is blue (#2563eb)
    btnColor: {
      type: String,
      default: '#2563eb'
    },
    // Text color for the button; default is white (#fff)
    textColor: {
      type: String,
      default: '#fff'
    }
  });
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
  