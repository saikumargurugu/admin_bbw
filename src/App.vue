<template>
  <div class="app-wrapper">
    <!-- Navbar at the top -->
    <Navbar @toggleSidebar="toggleSidebar" />

    <!-- Sidebar (positioned to slide in/out); remains fixed -->
    <Sidebar :isOpen="sidebarOpen" @toggle="toggleSidebar" />

    <!-- Main content area that fills the screen with 5% padding.
         When the sidebar is open, it shifts to the right -->
    <div class="main-content" :class="{ 'content-shift': sidebarOpen }">
      <!-- Card-style container wrapping the routed content (i.e. your create form) -->
      <div class="content-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>
/* The overall app-wrapper fills the viewport and accounts for the fixed navbar */
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;       /* Full viewport height */
  padding-top: 60px;   /* Space for the navbar */
}

/* Main content fills remaining space with 5% padding and a gentle gradient background.
   Using flex with align-items flex-start ensures content starts at the top so nothing gets hidden under the navbar.
   'overflow-y: auto' ensures the entire content is scrollable if needed. */
.main-content {
  flex: 1;
  width: 100%;
  height: calc(100vh - 60px); /* Full height minus navbar */
  padding: 5%;
  box-sizing: border-box;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  transition: margin-left 0.3s ease;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Card-style container that wraps the routed page (e.g. your Create Form) */
.content-container {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  padding: 2rem;
}

/* Shift the main content when the sidebar is open */
.content-shift {
  margin-left: 250px; /* Sidebar width */
}

/* Deep selector for the input controls rendered in the form.
   This increases their size, adds spacing between them, and styles them as desired. */
:deep(.input-control) {
  width: 100%;
  padding: 1rem;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Optionally, ensure form elements within the card are spaced in a vertical flex layout */
:deep(form) {
  display: flex;
  flex-direction: column;
}
</style>
