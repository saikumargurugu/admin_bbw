<template>
  <button
    @click="redirect"
    :aria-label="ariaLabel"
    style="border-radius: 9999px;"
    class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-green-300 to-green-500 text-white text-5xl font-bold shadow-lg transition cursor-pointer"
  >
    <slot>+</slot>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  to: { type: String, required: true },
  ariaLabel: { type: String, default: 'Action' },
});

const router = useRouter();
function redirect() {
  router.push(props.to);
}
</script>