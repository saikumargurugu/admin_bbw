<template>
    <div>
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold">Users</h2>
          <p class="text-gray-500">1,024</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold">Active Sessions</h2>
          <p class="text-gray-500">245</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold">Server Status</h2>
          <p class="text-green-500">Online</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
  };
  </script>
  