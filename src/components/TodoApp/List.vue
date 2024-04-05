<script setup lang="ts">
import { ref } from "vue";
import EditIcon from "../../assets/icons/EditIcon.vue";
import DeleteIcon from "../../assets/icons/DeleteIcon.vue";
import MoreIcon from "../../assets/icons/MoreIcon.vue";
import WspIcon from "../../assets/icons/WspIcon.vue";
import ModalDelete from "./ModalDelete.vue";
import ModalEdit from "./ModalEdit.vue";
import Options from "./Options.vue";
import { useTaskStore } from "../../store/TaskStore";
import { Task, TaskStatus } from "../../interfaces/Task.interface";

const taskStore = useTaskStore();
const taskID = ref("");
const taskData = ref<Task>();

const modalVisible = ref(false);
const modalEditVisible = ref(false);

const openModal = (task: string) => {
  taskID.value = task;
  modalVisible.value = true;
};

const openModalEdit = (task: Task) => {
  taskData.value = task;
  modalEditVisible.value = true;
};

const deleteItem = () => {
  taskStore.deleteTask(taskID.value);
};

const changeStatus = (task: Task) => {
  taskStore.toggleTaskStatus(task.id);
};

const shareTaskViaWhatsApp = (message: string) => {
  const taskText = message;
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    taskText
  )}`;
  window.open(whatsappLink);
};
</script>
<template>
  <div
    v-for="task in taskStore.filteredTasks"
    :key="task.id"
    class="flex gap-2 items-center"
  >
    <input
      type="checkbox"
      @click="changeStatus(task)"
      :checked="task.state === TaskStatus.Completed"
      class="checkbox w-[18px] h-[18px] text-gray-300 bg-gray-300 hover:bg-gray-400 focus:ring-gray-500"
    />
    <span
      class="text-sm w-[325px] truncate cursor-pointer"
      @click="changeStatus(task)"
      :class="
        task.state === TaskStatus.Completed ? 'text-[#98A1AE] line-through' : ''
      "
      >{{ task.text }}
    </span>
    <div class="hidden md:flex gap-2">
      <button @click="openModalEdit(task)">
        <EditIcon class="text-[#0074F9]" />
      </button>
      <button @click="openModal(task.id)"><DeleteIcon /></button>
    </div>
    <Options :isTop="false">
      <template #trigger>
        <MoreIcon />
      </template>
      <a
        @click="openModalEdit(task)"
        class="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        ><EditIcon class="text-[#5A6472]" /> Editar Tarea</a
      >
      <a
        @click="shareTaskViaWhatsApp(task.text)"
        class="block flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        ><WspIcon /> Compartir por Whatsapp</a
      >
      <a
        @click="openModal(task.id)"
        class="block px-4 py-2 flex items-center gap-2 text-sm text-[#F7473B] hover:bg-red-200"
        ><DeleteIcon /> Eliminar</a
      >
    </Options>
  </div>
  <ModalDelete
    :visible="modalVisible"
    title="Delete Item"
    message="Are you sure you want to delete?"
    @update:visible="modalVisible = $event"
    @confirm="deleteItem"
  />

  <ModalEdit
    :visible="modalEditVisible"
    title="Edit Item"
    :taskData="taskData"
    @update:visible="modalEditVisible = $event"
  />
</template>
<style scoped>
input[type="checkbox"] {
  width: 14px !important;
  height: 14px !important;
  margin: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: 1px solid #98a1ae;
  box-shadow: none;
  font-size: 0.8em;
  text-align: center;
  line-height: 1em;
  background: white;
}

input[type="checkbox"]:checked:after {
  content: "✔";
  color: white !important;
  background: #98a1ae;
}
</style>
