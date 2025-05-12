<template>
    <div class="hero-section">
      <h1 class="hero-title">{{ title }}</h1>
      <p v-if="description" class="hero-description">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
    description: String,
  });
  </script>
  
  <style scoped>
  .hero-section {
    background-color: #fff;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }
  .hero-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .hero-description {
    color: #666;
    margin-top: 0.25rem;
  }
  </style>