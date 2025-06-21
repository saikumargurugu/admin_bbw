<template>
  <div class="w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm my-4 min-h-[300px] md:min-h-[500px]">
    <!-- Header slot for title or custom content -->
    <div class="px-6 py-5 bg-gray-100 border-b border-gray-200 text-lg font-bold text-black">
      <slot name="header" />
    </div>
    
    <!-- Responsive table container -->
    <div class="w-full overflow-x-auto">
      <table class="min-w-full bg-white border-collapse text-base text-black">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="sortBy(column.key)"
              class="bg-white cursor-pointer px-6 py-4 border-b border-gray-200 text-left whitespace-nowrap hover:bg-gray-100"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in paginatedData"
            :key="row.id"
            @click="$router.push(rowLink(row))"
            class="hover:bg-gray-50 cursor-pointer"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 border-b border-gray-100 whitespace-nowrap"
            >
              {{ row[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination controls with updated styling -->
    <div
      v-if="sortedData.length > perPage"
      class="flex justify-center items-center gap-4 bg-white border border-gray-300 rounded-md px-4 py-3 m-4 shadow"
    >
      <button
        @click="page--"
        :disabled="page === 1"
        class="bg-blue-600 px-4 py-2 rounded text-white text-base transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >Prev</button>
      <span class="text-base font-medium text-gr  ay-700">Page {{ page }}</span>
      <button
        @click="page++"
        :disabled="end >= sortedData.length"
        class="bg-blue-600 px-4 py-2 rounded text-white text-base transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >Next</button>
    </div>
    
    <!-- Footer with dynamic buttons -->
    <div class="px-6 py-4 bg-white border-t border-gray-200">
      <div class="flex gap-2 justify-end">
        <Button 
          v-if="buttonsConfig && buttonsConfig.length > 0"
          v-for="(btn, index) in buttonsConfig" 
          :key="index"
          :btnColor="btn.btnColor"
          :textColor="btn.textColor"
          @click="btn.onClick"
        >
          {{ btn.label }}
        </Button>
        <Button v-else-if="onCreate" @click="onCreate">
          {{ createButtonText }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  items: Array,
  columns: Array,
  linkResolver: Function,
  // Dynamic button configuration as an array of objects.
  // Each object can define: label, btnColor, textColor, onClick
  buttonsConfig: {
    type: Array,
    default: () => []
  },
  // Fallback properties if no dynamic configuration is provided.
  onCreate: Function,
  createButtonText: {
    type: String,
    default: 'Create'
  }
});

const page = ref(1);
const perPage = 10;
const sortKey = ref(null);

const sortedData = computed(() => {
  if (!sortKey.value) return props.items;
  return [...props.items].sort((a, b) => (a[sortKey.value] > b[sortKey.value] ? 1 : -1));
});

const paginatedData = computed(() => {
  const start = (page.value - 1) * perPage;
  return sortedData.value.slice(start, start + perPage);
});

const end = computed(() => page.value * perPage);

function sortBy(key) {
  sortKey.value = key;
}

function rowLink(row) {
  return props.linkResolver ? props.linkResolver(row) : `/${row.id}`;
}
</script>
