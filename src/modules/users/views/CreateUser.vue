<template>
  <div>
    <HeroSection title="Create User" description="Fill in the details to create a new user" />

    <FormBuilder
      :config="formConfig"
      :initialValues="formValues"
      submitLabel="Create User"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import HeroSection from '@/components/ui/HeroSection.vue';
import FormBuilder from '@/components/ui/FormBuilder.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formConfig = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    attrs: { placeholder: 'Enter full name', required: true }
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    attrs: { placeholder: 'Enter email', required: true }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    attrs: { placeholder: 'Enter password', required: true }
  }
];

const formValues = ref({
  name: '',
  email: '',
  password: ''
});

function handleSubmit(data) {
  console.log('User data submitted:', data);
  // Handle form submission (API call or state update)
  router.push('/users');
}
</script>

<style scoped>
/* Optional styling */
</style>
