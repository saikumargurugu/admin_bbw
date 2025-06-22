<template>
  <div class="flex gap-2">
    <button
      class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
      style="min-width: 80px; background-color: #2563eb !important; color: #fff !important;"
      @click="$emit('edit', id)"
    >
      Edit
    </button>
    <button
      class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold shadow transition"
      style="min-width: 80px; background-color: #dc2626 !important; color: #fff !important;"
      @click="$emit('delete', id)"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});
</script>