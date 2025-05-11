<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Organisations</h1>
      <table class="w-full border-collapse border">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Name</th>
            <th class="p-2 border">Industry</th>
            <th class="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="org in organisations" :key="org.id">
            <td class="p-2 border">{{ org.name }}</td>
            <td class="p-2 border">{{ org.industry }}</td>
            <td class="p-2 border">
              <span :class="org.active ? 'text-green-600' : 'text-red-500'">
                {{ org.active ? 'Active' : 'Inactive' }}
              </span>
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
        organisations: [
          { id: 1, name: 'Griffith Badminton Club', industry: 'Sports', active: true },
          { id: 2, name: 'Uno Simple Ltd.', industry: 'Software', active: false },
          { id: 3, name: 'Aerosimple', industry: 'Aviation', active: true },
        ],
      };
    },
  };
  </script>
