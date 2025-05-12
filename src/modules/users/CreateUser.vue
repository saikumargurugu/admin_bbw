<template>
  <div class="create-user-page">
    <!-- Hero Section at the top -->
    <HeroSection 
      title="Create User" 
      description="Fill out the details below to add a new user." 
    />

    <!-- Form Card Container -->
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
import HeroSection from '@/components/ui/HeroSection.vue'
import FormBuilder from '@/components/ui/FormBuilder.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const users = ref([
  { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', dob: '1990-01-01', phone: '1234567890' },
  { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', dob: '1992-02-02', phone: '9876543210' },
])

function handleSubmit(newUser) {
  newUser.id = users.value.length + 1
  users.value.push(newUser)
  // Optionally, you could navigate using router.push here, if needed.
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
/* Full page background with a subtle gradient */
.create-user-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  min-height: 100vh;
  padding: 2rem 5%;
}

/* Card-style container for the form */
.user-form {
  margin-top: 3rem;
  padding: 2.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 800px;
}

/* Header styling for the form card */
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

/* If the FormBuilder renders a form, style it as a grid */
:deep(form) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Style input labels so they are visible */
:deep(.input-label) {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

/* Style the input fields */
:deep(.input-control) {
  width: 100%;
  padding: 1rem;
  font-size: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

/* Style the submit button to span full width of the form grid */
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
