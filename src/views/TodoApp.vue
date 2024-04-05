<script setup lang="ts">
import background from "../assets/images/background.png";
import Card from "../components/TodoApp/Card.vue";
import TaskForm from "../components/TodoApp/TaskForm.vue";
import Filters from "../components/TodoApp/Filters.vue";
import List from "../components/TodoApp/List.vue";
</script>
<template>
  <div class="bg-gray-300 w-full">
    <img
      :src="background"
      alt="background todo"
      class="w-full h-[200px] md:h-[247px]"
    />
    <div class="absolute top-[55px] md:top-20 flex justify-center w-full">
      <div class="w-[328px] md:w-[450px]">
        <div
          class="font-bold text-white text-[36px] flex justify-center md:justify-start"
        >
          TODO
        </div>
        <Card>
          <template #header>
            <TaskForm></TaskForm>
          </template>
          <template #body> <List></List> </template>
          <template #footer><Filters></Filters> </template>
        </Card>
      </div>
    </div>
  </div>
</template>
