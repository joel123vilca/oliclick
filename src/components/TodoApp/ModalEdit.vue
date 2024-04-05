<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { Task } from "../../interfaces/Task.interface";
import { useTaskStore } from "../../store/TaskStore";

const taskStore = useTaskStore();

const props = defineProps({
  visible: Boolean,
  title: String,
  taskData: Object as () => Task,
});

const task = ref("");
const isEmpty = ref(false);
const maxLength = 36;

const emit = defineEmits(["update:visible", "confirm"]);

const close = () => {
  emit("update:visible", false);
};

const confirm = () => {
  emit("update:visible", false);
  const taskID = props.taskData ? props.taskData.id : "";
  taskStore.editTask(taskID, task.value);
};

const checkMaxLength = () => {
  if (task.value.length > maxLength) {
    task.value = task.value.substring(0, maxLength);
  }
};

watch(
  () => props.taskData,
  (newValue: any, oldValue: any) => {
    if (newValue !== oldValue && newValue) {
      task.value = newValue.text;
    }
  }
);
watch(task, () => {
  if (isEmpty.value) {
    isEmpty.value = task.value.trim() === "";
  }
});
</script>
<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50"
  >
    <div class="bg-white z-20 p-8 rounded-lg shadow-lg w-[300px] md:w-[400px]">
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
      <div class="flex items-center">
        <div class="relative w-full mr-4 py-2">
          <span
            class="absolute top-0 left-0.5 flex items-center px-2 bg-white text-xs text-[#8D97A5]"
            :class="{ 'text-red-500': isEmpty }"
            >Edit Task</span
          >
          <textarea
            v-model="task"
            class="md:h-10 h-[50px] w-full resize-none overflow-y-auto rounded-md border border-[#9E9E9E] p-2 text-2xs text-black outline-none"
            :class="{ 'border-red-500': isEmpty }"
            placeholder="Write task"
            @input="checkMaxLength"
          ></textarea>
          <div
            class="absolute bottom-4 right-4 text-[10px] text-[#8D97A5]"
            :class="{ 'text-red-500': isEmpty }"
          >
            {{ task.length }}/{{ maxLength }}
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-end">
        <button
          @click="confirm"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
        >
          Save
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
