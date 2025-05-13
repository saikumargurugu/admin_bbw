<template>
  <div class="create-user-page">
    <!-- Hero Section -->
    <HeroSection 
      title="Create User" 
      description="Fill out the details below to add a new user." 
    />

    <!-- User Form -->
    <div class="user-form">
      <div class="form-header">
        <h2>New User Information</h2>
        <p>Enter all required details to create a new account.</p>
      </div>

      <FormBuilder
        :config="formConfig"
        :initialValues="{}"
        submitLabel="Create"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeroSection from '@/components/ui/HeroSection.vue'
import FormBuilder from '@/components/ui/FormBuilder.vue'

const router = useRouter()

function handleSubmit(userData) {
  console.log('User Submitted:', userData)
  alert('User created successfully!')
  router.push('/users') // Navigate to the user list page after creation
}

const formConfig = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    attrs: { placeholder: 'Enter first name', required: true },
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    attrs: { placeholder: 'Enter last name', required: true },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    attrs: { placeholder: 'Enter email', required: true },
  },
  {
    name: 'dob',
    label: 'Date of Birth',
    type: 'date',
    attrs: { required: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    attrs: { placeholder: 'Enter phone number', required: true },
  },
]
</script>

<style scoped>
.create-user-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  min-height: 100vh;
  padding: 2rem 5%;
}

.user-form {
  margin-top: 3rem;
  padding: 2.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 900px;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-header p {
  font-size: 1.125rem;
  color: #666;
}

:deep(form) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
}

@media (max-width: 768px) {
  :deep(form) {
    grid-template-columns: 1fr;
  }
}

:deep(.input-label) {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}
:deep(.input-control) {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1.5rem;     /* ← added spacing */
}

:deep(button[type="submit"]) {
  grid-column: 1 / -1;
  background-color: #2563eb;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

:deep(button[type="submit"]:hover) {
  background-color: #1d4ed8;
}
</style>
