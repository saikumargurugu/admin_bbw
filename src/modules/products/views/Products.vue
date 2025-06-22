<template>
  <div>
    <HeroSection title="Products" description="Manage all products" />
    <div class="flex justify-end m-4">
      <FabButton to="/products/create" aria-label="Create Product" />
    </div>
    <ListView :items="products" :columns="columns" :linkResolver="linkResolver" />
  </div>
</template>

<script setup>
import HeroSection from '@/components/ui/HeroSection.vue';
import ListView from '@/components/ui/ListView.vue';
import FabButton from '@/components/ui/FabButton.vue';
import { ref, onMounted } from 'vue';
import api from '@/api';

const products = ref([]);
const columns = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Price', key: 'price' },
  { label: 'Brand', key: 'brand_name' },
  { label: 'Type', key: 'product_type_name' },

  // Add more columns as needed
];

function linkResolver(product) {
  return `/products/${product.id}/details`;
}

onMounted(async () => {
  try {
    const response = await api.get('/products/');
    products.value = response.results || response; 
  } catch (error) {
    // Handle error (optional)
    products.value = [];
  }
});
</script>

<style scoped>
/* Optional additional styling */
</style>
