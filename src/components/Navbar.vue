<template>
  <nav class="flex items-center justify-between bg-[#2c3e50] text-white px-4 py-2 fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center gap-4">
      <button
        class="text-2xl bg-transparent border-none text-white cursor-pointer focus:outline-none"
        @click="$emit('toggleSidebar')"
        aria-label="Toggle sidebar"
      >☰</button>
      <span class="text-xl font-bold">My App</span>
    </div>
  </nav>
</template>

<script setup>
  // No special logic needed here as the hamburger click simply emits an event.
</script>

<!-- <style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2c3e50;
  color: white;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style> -->
