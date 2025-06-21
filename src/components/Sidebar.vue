<template>
  <transition name="slide">
    <aside
      v-if="isOpen"
      class="fixed top-0 left-0 h-full w-90 bg-[#2c3e50] text-white z-50 shadow-lg flex flex-col p-5"
    >
      <button
        @click="$emit('toggle')"
        class="self-end bg-transparent border-none text-2xl text-white cursor-pointer mb-6"
        aria-label="Close sidebar"
      >×</button>
      <nav class="flex flex-col gap-2">
        <router-link to="/" class="block py-2 px-3 rounded hover:bg-[#34495e] transition">Dashboard</router-link>
        <router-link to="/users" class="block py-2 px-3 rounded hover:bg-[#34495e] transition">Users</router-link>
        <router-link to="/organisations" class="block py-2 px-3 rounded hover:bg-[#34495e] transition">Organisations</router-link>
        <router-link to="/settings" class="block py-2 px-3 rounded hover:bg-[#34495e] transition">Settings</router-link>
      </nav>
    </aside>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
