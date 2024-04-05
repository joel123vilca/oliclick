<script setup lang="ts">
import { ref, watch } from "vue";
import PlusIcon from "../../assets/icons/PlusIcon.vue";
import { Task, TaskStatus } from "../../interfaces/Task.interface";
import { useTaskStore } from "../../store/TaskStore";

const taskStore = useTaskStore();

const task = ref("");
const isEmpty = ref(false);
const maxLength = 36;

const checkMaxLength = () => {
  if (task.value.length > maxLength) {
    task.value = task.value.substring(0, maxLength);
  }
};

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const createTask = () => {
  if (task.value === "") {
    isEmpty.value = true;
  } else {
    const data: Task = {
      id: generateId(),
      text: task.value,
      createdAt: new Date().toISOString(),
      state: TaskStatus.Pending,
    };
    taskStore.addTask(data);
    isEmpty.value = false;
    task.value = "";
  }
};

watch(task, () => {
  if (isEmpty.value) {
    isEmpty.value = task.value.trim() === "";
  }
});
</script>
<template>
  <div class="w-full flex items-center">
    <div class="relative w-full mr-4 py-2">
      <span
        class="absolute top-0 left-0.5 flex items-center px-2 bg-white text-xs text-[#8D97A5]"
        :class="{ 'text-red-500': isEmpty }"
        >New Task</span
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
    <button
      @click="createTask"
      class="bg-[#006FFF] w-[48px] md:w-[104px] h-10 text-white rounded-md flex gap-2 justify-center items-center mt-[-6px]"
    >
      <PlusIcon /> <span class="hidden md:block">Create</span>
    </button>
  </div>
</template>
