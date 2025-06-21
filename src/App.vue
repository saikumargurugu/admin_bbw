<template>
  <v-theme-provider theme="light">
    <Navbar @toggleSidebar="toggleSidebar" />
    <div class="flex flex-col min-h-screen pt-14">
      <div class="flex flex-row w-full">
        <Sidebar :isOpen="sidebarOpen" @toggle="toggleSidebar" class="w-80" />
        <div class="flex-1 w-full p-5 bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] overflow-y-auto flex items-start justify-center">
          <div class="w-full bg-white rounded-xl shadow-xl p-8">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </v-theme-provider>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

const sidebarOpen = ref(false);
const route = useRoute();
</script>
