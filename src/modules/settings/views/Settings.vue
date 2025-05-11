<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">Settings</h1>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Display Name</label>
          <input v-model="settings.displayName" class="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email Notifications</label>
          <input type="checkbox" v-model="settings.emailNotifications" />
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settings: {
          displayName: 'Sai Kumar',
          emailNotifications: true,
        },
      };
    },
  };
  </script>
  