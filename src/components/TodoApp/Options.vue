<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  isTop: Boolean,
});
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>
<template>
  <div class="relative block md:hidden">
    <button @click="toggleDropdown">
      <slot name="trigger"></slot>
    </button>
    <div
      v-if="showDropdown"
      :class="props.isTop ? 'bottom-0' : ''"
      class="absolute z-10 right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1" @click="toggleDropdown">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
