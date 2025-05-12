<template>
  <div>
    <!-- <HeroSection title="Users" description="Manage all registered users" /> -->

    <ListView
      :items="users"
      :columns="columns"
      :onCreate="goToCreate"
      :linkResolver="linkResolver"
    />
  </div>
</template>

<script setup>
import HeroSection from '@/components/ui/HeroSection.vue';
import ListView from '@/components/ui/ListView.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '04515343546', address : '25 Dunsstable st', plan:'full' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '04515343546', address : '25 Dunsstable st', plan:'full' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', phone: '04515343546', address : '25 Dunsstable st', plan:'full' },
]);

const columns = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Address', key: 'address' },
  { label: 'Plan', key: 'plan' },
];

function goToCreate() {
  router.push('/users/create');
}

function linkResolver(user) {
  return `/users/${user.id}`;
}
</script>

<style scoped>
/* Optional additional styling */
</style>
