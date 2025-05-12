<template>
    <div class="list-view">
      <!-- Header slot for title or custom content -->
      <div class="list-header">
        <slot name="header" />
      </div>
      
      <!-- Responsive table container -->
      <div class="table-responsive">
        <table class="list-table">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                @click="sortBy(column.key)"
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
            >
              <td v-for="column in columns" :key="column.key">
                {{ row[column.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination controls with updated styling -->
      <div class="pagination">
        <button @click="page--" :disabled="page === 1">Prev</button>
        <span>Page {{ page }}</span>
        <button @click="page++" :disabled="end >= sortedData.length">Next</button>
      </div>
      
      <!-- Footer with dynamic buttons -->
      <div class="list-footer">
        <div class="buttons-group">
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
  
  <style scoped>
  .list-view {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin: 1rem 0;
    /* Increased minimum dimensions */
    min-width: 1000px;
    min-height: 500px;
  }
  
  .list-header {
    padding: 1.25rem 1.5rem;
    background: #f7f7f7;
    border-bottom: 1px solid #eee;
    font-size: 1.25rem;
    font-weight: bold;
    color: #000;
  }
  
  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }
  
  .list-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    font-size: 1.1rem;
    color: #000;
  }
  
  .list-table th,
  .list-table td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
    text-align: left;
    white-space: nowrap;
    color: #000;
  }
  
  .list-table th {
    background: #fff;
    cursor: pointer;
  }
  
  .list-table th:hover {
    background: #f0f0f0;
  }
  
  .list-table tr:hover {
    background: #f9f9f9;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    margin: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .pagination button {
    background-color: #2563eb;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .pagination button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  .pagination button:not(:disabled):hover {
    background-color: #1d4ed8;
  }
  
  .pagination span {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }
  
  .list-footer {
    padding: 1rem 1.5rem;
    background: #fff;
    border-top: 1px solid #eee;
  }
  
  .buttons-group {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  </style>
  