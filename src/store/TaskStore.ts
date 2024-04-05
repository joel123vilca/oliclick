import { defineStore } from "pinia";

import { Task, TaskStatus } from "../interfaces/Task.interface";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]") as Task[],
    typeStatus: "all" as TaskStatus,
  }),
  getters: {
    tasksData: (state) => state.tasks,
    filteredTasks: (state) => {
      if (state.typeStatus === TaskStatus.All) {
        return state.tasks;
      } else {
        return state.tasks.filter((task) => task.state === state.typeStatus);
      }
    },
    pendingTasksCount: (state) => {
      return state.tasks.filter((task) => task.state === TaskStatus.Pending)
        .length;
    },
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
      this.persistTasks();
    },
    deleteTask(id: string) {
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.persistTasks();
      }
    },
    editTask(taskId: string, newText: string) {
      const index = this.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        this.tasks[index].text = newText;
        this.persistTasks();
      }
    },
    toggleTaskStatus(taskID: string) {
      const task = this.tasks.find((task) => task.id === taskID);
      if (task) {
        task.state =
          task.state === TaskStatus.Pending
            ? TaskStatus.Completed
            : TaskStatus.Pending;
        this.persistTasks();
      }
    },
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter(
        (task) => task.state !== TaskStatus.Completed
      );
      this.persistTasks();
    },
    setFilter(typeStatus: TaskStatus) {
      this.typeStatus = typeStatus;
    },
    persistTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
});
