<template>
  <div class="bg-white p-4 border-b border-gray-200">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <p v-if="description" class="text-gray-600 mt-1">{{ description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
});
</script>

<style scoped>
.bg-white {
  background-color: #fff;
}

.p-4 {
  padding: 1rem;
}

.border-b {
  border-bottom: 1px solid #ddd;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: bold;
}

.text-gray-600 {
  color: #4b5563;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>