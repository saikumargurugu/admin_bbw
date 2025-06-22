<template>
  <transition name="slide">
    <div v-if="isOpen">
      <!-- Overlay for click outside -->
      <div
        class="fixed inset-0 bg-transparent z-40"
        @click="$emit('toggle')"
      ></div>
      <aside
        class="fixed top-0 left-0 h-full w-64 bg-[#2c3e50] text-white z-50 shadow-lg flex flex-col p-5
               transform transition-transform duration-300 translate-x-0"
      >
        <button
          @click="$emit('toggle')"
          class="self-end bg-transparent border-none text-2xl text-white cursor-pointer mb-6"
          aria-label="Close sidebar"
        >×</button>
        <nav class="flex flex-col gap-2">
          <router-link
            v-for="route in sidebarRoutes"
            :key="route.path"
            :to="route.path"
            class="flex items-center gap-3 py-2 px-3 rounded hover:bg-[#34495e] transition"
            @click="$emit('toggle')"
          >
            <span v-html="route.icon" class="text-lg"></span>
            <span>{{ route.label }}</span>
          </router-link>
        </nav>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { flattenRoutes } from '../router';
import { appRoutes } from '../router/routes';
const sidebarRoutes = appRoutes.filter(route => route.path !== '/login' && route.label); 
defineProps({
  isOpen: Boolean,
});
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
