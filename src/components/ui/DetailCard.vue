<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-2">
    <div class="max-w-2xl md:max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-4 md:p-10 my-8 md:my-16"> <!-- Added my-8 md:my-16 for vertical margin -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-12">
        <!-- Images Section (dynamic) -->
        <div v-if="images && images.length" class="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full">
            <img
              v-for="(img, idx) in images"
              :key="idx"
              :src="img"
              class="w-full h-40 sm:h-48 md:h-56 object-cover rounded-xl border shadow transition duration-300 hover:scale-105"
              :alt="`Image ${idx + 1}`"
            />
          </div>
        </div>
        <!-- Details Section -->
        <div :class="images && images.length ? 'flex-1 w-full' : 'w-full' + ' px-4 md:px-8'">
          <h2 v-if="data?.name" class="text-2xl md:text-5xl font-extrabold mb-4 md:mb-8 text-blue-800 flex flex-wrap items-center gap-2">
            {{ data.name }}
            <span
              v-if="data.in_stock !== undefined"
              :class="data.in_stock ? 'ml-2 px-2 py-1 text-xs md:text-sm rounded bg-green-100 text-green-700' : 'ml-2 px-2 py-1 text-xs md:text-sm rounded bg-red-100 text-red-700'"
            >
              {{ data.in_stock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </h2>
          <hr class="border-gray-300 mb-4 md:mb-6" />
          <table class="w-full text-sm md:text-base">
            <tbody>
              <tr v-for="(value, key) in displayFields" :key="key">
                <td class="py-2 pr-2 font-semibold text-gray-700 text-right align-top w-32 md:w-40 capitalize">
                  {{ formatLabel(key) }}:
                </td>
                <td class="py-2 text-gray-900">
                  <template v-if="isArray(value)">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="(item, idx) in value"
                        :key="idx"
                        class="inline-block px-2 py-1 rounded bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 text-xs border"
                      >
                        {{ getDisplayValue(item) }}
                      </span>
                      <span v-if="!value.length" class="text-gray-400">—</span>
                    </div>
                  </template>
                  <template v-else-if="isObject(value)">
                    <span>
                      <span v-for="(v, k, idx) in value" :key="k" class="block">
                        <span class="font-semibold">{{ formatLabel(k) }}:</span>
                        <span class="ml-1">{{ getDisplayValue(v) }}</span>
                      </span>
                    </span>
                  </template>
                  <template v-else>
                    <span v-if="key === 'price'" class="font-bold text-xl md:text-2xl">${{ value }}</span>
                    <span v-else-if="key === 'discount'">{{ value }}%</span>
                    <span v-else>{{ value }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: { type: Object, required: true },
  imageField: { type: String, default: 'images' },
  exclude: { type: Array, default: () => [] },
  fields: { type: Array, default: null },
  showIds: { type: Boolean, default: false },
});

// Get images array dynamically
const images = computed(() => {
  if (!props.data) return [];
  return Array.isArray(props.data[props.imageField]) ? props.data[props.imageField] : [];
});

// Prepare fields to display
const displayFields = computed(() => {
  let keys = props.fields
    ? props.fields
    : Object.keys(props.data || {}).filter(
        k =>
          k !== props.imageField &&
          !props.exclude.includes(k) &&
          k !== 'name' &&
          k !== 'in_stock' &&
          (props.showIds || k.toLowerCase() !== 'id') // <-- Hide 'id' unless showIds is true
      );
  const out = {};
  for (const k of keys) {
    out[k] = props.data[k];
  }
  return out;
});

// Helpers
function isArray(val) {
  return Array.isArray(val);
}
function isObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val);
}
function getDisplayValue(val) {
  if (isObject(val) && val.name) return val.name;
  if (isObject(val)) return JSON.stringify(val);
  return val;
}
function formatLabel(label) {
  return label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
</script>