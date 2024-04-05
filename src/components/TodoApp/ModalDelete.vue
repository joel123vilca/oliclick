<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">{{ title }}</h2>
        <button @click="close" class="text-gray-600 hover:text-gray-800">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <p>{{ message }}</p>
      </div>
      <div class="mt-8 flex justify-end">
        <button
          @click="confirm"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-4"
        >
          Confirm
        </button>
        <button
          @click="close"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  visible: Boolean,
  title: String,
  message: String,
});

const emit = defineEmits(["update:visible", "confirm"]);

const close = () => {
  emit("update:visible", false);
};

const confirm = () => {
  emit("update:visible", false);
  emit("confirm");
};
</script>
