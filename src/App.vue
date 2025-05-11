<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar :isOpen="isSidebarOpen" @toggle="toggleSidebar" /> <!-- Pass Props & Events -->
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  data() {
    return {
      isSidebarOpen: false, // Sidebar state
    };
  },
  methods: {
    toggleSidebar() {
      console.log("innnnnn222");
      
      this.isSidebarOpen = !this.isSidebarOpen; // Toggle Sidebar
    },
  },
  components: { Sidebar },
};
</script>
