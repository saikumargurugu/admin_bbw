<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-blue-50  to-blue-100 py-8 px-2">
    <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl md:p-10 my-8 md:my-16">
      <h2 class="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Edit Product</h2>
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 bg-white rounded-xl"
      >
        <template v-for="field in formConfig" :key="field.key">
          <InputField
            v-if="field.type === 'text' || field.type === 'number' || field.type === 'textarea'"
            :label="field.label"
            v-model="form[field.key]"
            :config="field.config"
            :class="field.class"
          />
          <SelectInput
            v-else-if="field.type === 'select'"
            :label="field.label"
            v-model="form[field.key]"
            :options="field.options"
            :option-label="field.optionLabel"
            :option-value="field.optionValue"
            :config="field.config"
            :class="field.class"
          />
          <CheckboxGroupInput
            v-else-if="field.type === 'checkbox-group'"
            :label="field.label"
            v-model="form[field.key]"
            :options="field.options"
            :option-label="field.optionLabel"
            :option-value="field.optionValue"
            :class="field.class"
          />
          <div v-else-if="field.type === 'checkbox'" :class="field.class">
            <input v-model="form[field.key]" type="checkbox" :id="field.key" class="mr-2 accent-blue-600" />
            <label :for="field.key" class="font-semibold text-gray-700">{{ field.label }}</label>
          </div>
          <!-- Custom images upload input -->
          <div v-else-if="field.type === 'images'" :class="field.class">
            <label class="block font-semibold mb-1 text-gray-700">{{ field.label }}</label>
            <input
              type="file"
              multiple
              accept="image/*"
              @change="onImageUpload"
              class="w-full border rounded px-3 py-2"
            />
            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(img, idx) in previewImages"
                :key="idx"
                class="relative group"
              >
                <img
                  :src="img"
                  class="w-16 h-16 object-cover rounded border"
                  :alt="`Image ${idx + 1}`"
                />
                <button
                  type="button"
                  class="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 opacity-80 hover:opacity-100 group-hover:opacity-100 transition"
                  @click="removeImage(idx)"
                  title="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
      </form>
      <div class="flex gap-4 justify-end mt-8">
        <Button
          btnColor="bg-blue-600 hover:bg-blue-700"
          textColor="text-white"
          class="shadow"
          style="min-width: 100px;"
          @click="onSubmit"
        >
          Save
        </Button>
        <Button
          btnColor="bg-gray-300 hover:bg-gray-400"
          textColor="text-gray-800"
          class="shadow"
          style="min-width: 100px;"
          @click="onCancel"
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import Button from '@/components/ui/Button.vue';
import InputField from '@/components/ui/InputField.vue';
import SelectInput from '@/components/ui/inputs/SelectInput.vue';
import CheckboxGroupInput from '@/components/ui/inputs/CheckboxGroupInput.vue';

const route = useRoute();
const router = useRouter();

const form = ref({
  name: '',
  price: '',
  qty: '',
  in_stock: false,
  brand: '',
  category: '',
  product_type: '',
  discount: '',
  colors: [],
  product_details: '',
  images: [],
});
const previewImages = ref([]);

const brands = ref([]);
const categories = ref([]);
const productTypes = ref([]);
const colors = ref([]);

const formConfig = computed(() => [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    config: { type: 'text', required: true, label: 'Name' },
  },
  {
    key: 'price',
    label: 'Price',
    type: 'number',
    config: { type: 'number', required: true, step: 0.01, min: 0, label: 'Price' },
  },
  {
    key: 'qty',
    label: 'Quantity',
    type: 'number',
    config: { type: 'number', required: true, min: 0, label: 'Quantity' },
  },
  {
    key: 'in_stock',
    label: 'In Stock',
    type: 'checkbox',
    class: 'flex items-center mt-6',
    config: { label: 'In Stock' },
  },
  {
    key: 'brand',
    label: 'Brand',
    type: 'select',
    options: brands.value,
    optionLabel: 'name',
    optionValue: 'id',
    config: {
      required: true,
      label: 'Brand',
      url: '/brands/',
    },
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: categories.value,
    optionLabel: 'name',
    optionValue: 'id',
    config: {
      required: true,
      label: 'Category',
      url: '/categories/',
    },
  },
  {
    key: 'product_type',
    label: 'Product Type',
    type: 'select',
    options: productTypes.value,
    optionLabel: 'name',
    optionValue: 'id',
    config: {
      required: true,
      label: 'Product Type',
      url: '/product-types/',
    },
  },
  {
    key: 'discount',
    label: 'Discount (%)',
    type: 'number',
    config: { type: 'number', min: 0, max: 100, step: 0.01, label: 'Discount (%)' },
  },
  {
    key: 'colors',
    label: 'Colors',
    type: 'checkbox-group',
    options: colors.value,
    optionLabel: 'name',
    optionValue: 'id',
    class: 'md:col-span-2',
    config: {
      label: 'Colors',
      url: '/colors/',
    },
  },
  {
    key: 'product_details',
    label: 'Description',
    type: 'textarea',
    config: { type: 'textarea', rows: 4, label: 'Description' },
    class: 'md:col-span-2',
  },
  {
    key: 'images',
    label: 'Images (upload or preview)',
    type: 'images',
    class: 'md:col-span-2',
    config: { label: 'Images (upload or preview)' },
  },
]);

onMounted(async () => {
  const id = route.params.id;
  // Fetch product details
  const product = await api.get(`/products/${id}/`);
  form.value = {
    ...product,
    brand: product.brand?.id || '',
    category: product.category?.id || '',
    product_type: product.product_type?.id || '',
    colors: product.colors?.map(c => c.id) || [],
    images: product.images || [],
  };
  previewImages.value = (product.images || []);
  // Fetch options for selects
  [brands.value, categories.value, productTypes.value, colors.value] = await Promise.all([
    api.get('/brands/'),
    api.get('/categories/'),
    api.get('/product-types/'),
    api.get('/colors/'),
  ]);
});

async function onImageUpload(event) {
  const files = Array.from(event.target.files);
  const id = route.params.id;
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    // Optionally add model or other info if your backend expects it
    // formData.append('model', 'Product');
    const response = await api.post(`/products/${id}/uploads/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // Use the returned URL/path from your backend
    if (response && response.url) {
      previewImages.value.push(response.url);
      form.value.images.push(response.url);
    }
  }
}

function removeImage(idx) {
  previewImages.value.splice(idx, 1);
  form.value.images.splice(idx, 1);
}

async function onSubmit() {
  const id = route.params.id;
  // If you want to upload images to server, do it here and set form.value.images to the URLs
  await api.put(`/products/${id}/`, {
    ...form.value,
    price: parseFloat(form.value.price),
    qty: parseInt(form.value.qty),
    discount: form.value.discount ? parseFloat(form.value.discount) : null,
    colors: form.value.colors,
    images: form.value.images, // Should be URLs if your backend expects URLs
  });
  router.push(`/products/${id}`);
}

function onCancel() {
  router.push(`/products/${route.params.id}`);
}
</script>