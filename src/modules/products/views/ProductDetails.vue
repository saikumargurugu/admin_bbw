<template>
  <div>
    <div class="flex justify-end my-4">
      <DetailActions :id="data.id" @edit="onEdit" @delete="onDelete" />
    </div>
    <DetailCard :data="data" image-field="images" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import DetailCard from '@/components/ui/DetailCard.vue';
import DetailActions from '@/components/ui/DetailActions.vue';

const data = ref({});
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const id = route.params.id;
  data.value = await api.get(`/products/${id}/`);
});

function onEdit(id) {
  router.push(`/products/${id}/edit`);
}

async function onDelete(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    await api.delete(`/products/${id}/`);
    router.push('/products');
  }
}
</script>