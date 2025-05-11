<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">User Management</h1>
      <table class="w-full border">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Name</th>
            <th class="p-2 border">Email</th>
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.email }}</td>
            <td class="p-2 border">
              <button class="text-blue-500">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
      }
    },
  }
  </script>
  