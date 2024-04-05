<script setup lang="ts">
import { useTaskStore } from "../../store/TaskStore";
import { TaskStatus } from "../../interfaces/Task.interface";
import Options from "./Options.vue";

const taskStore = useTaskStore();

const setFilter = (type: TaskStatus) => {
  taskStore.setFilter(type);
};

const clearCompleted = () => {
  taskStore.deleteCompletedTasks();
};
</script>

<template>
  <div
    class="border-t border-gray-[rgba(231, 231, 231, 1)] px-5 pt-[23px] pb-4 flex justify-between items-center"
  >
    <span class="text-[#98A1AE] text-xs">
      {{ taskStore.pendingTasksCount }} items left</span
    >
    <a
      @click="setFilter(TaskStatus.All)"
      class="text-[#006EFF] text-sm underline cursor-pointer hidden md:block"
      >All</a
    >
    <a
      @click="setFilter(TaskStatus.Pending)"
      class="text-[#006EFF] text-sm underline cursor-pointer hidden md:block"
      >Pending</a
    >
    <a
      @click="setFilter(TaskStatus.Completed)"
      class="text-[#006EFF] text-sm underline cursor-pointer hidden md:block"
      >Completed</a
    >
    <a
      @click="clearCompleted"
      class="text-[#F7473B] text-sm underline cursor-pointer hidden md:block"
      >Clear Completed</a
    >
    <Options :isTop="true">
      <template #trigger>
        <a
          class="text-[#006EFF] text-sm underline cursor-pointer block md:hidden"
          >Filtrar Tareas</a
        >
      </template>
      <a
        @click="setFilter(TaskStatus.All)"
        class="block flex items-center gap-2 px-4 py-2 text-[#006EFF] text-sm underline hover:bg-gray-100"
        >All</a
      >
      <a
        @click="setFilter(TaskStatus.Pending)"
        class="block flex items-center gap-2 px-4 py-2 text-[#006EFF] text-sm underline hover:bg-gray-100"
        >Pending</a
      >
      <a
        @click="setFilter(TaskStatus.Completed)"
        class="block px-4 py-2 flex items-center gap-2 text-[#006EFF] text-sm underline hover:bg-red-200"
        >Completed</a
      >
      <a
        @click="clearCompleted"
        class="block px-4 py-2 flex items-center gap-2 text-sm text-[#F7473B] underline hover:bg-red-200"
        >Clear Completed</a
      >
    </Options>
  </div>
</template>
