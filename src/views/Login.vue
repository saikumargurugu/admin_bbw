<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="mb-6 text-2xl font-bold">Sign in to continue</h1>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-80">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border rounded px-4 py-2"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border rounded px-4 py-2"
        required
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        Sign in
      </button>
      <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
const { login, error } = useAuthStore();

const email = ref('');
const password = ref('');

function onSubmit() {
  login(email.value, password.value);
}
</script>