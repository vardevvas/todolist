<template>
    <header>
        <img src="./assets/logo.svg" alt="Pinia">
        <h1>{{ taskStore.name }}</h1>
    </header>
    <div class="new-task-form">
        <AddTasks />
    </div>
    <div class="filter">
        <button @click="fillter = 'all'">All Tasks</button>
        <button @click="fillter = 'favs'">Fav Tasks</button>
    </div>
    <div class="task-list" v-if="fillter === 'all'">
        <p>The number of tasks remaining is {{ taskStore.allCount }}</p>
        <div v-for="tasks in taskStore.tasks">
            <TaskDetails :task="tasks" />
        </div>
    </div>
    <div class="task-list" v-if="fillter === 'favs'">
        <p>The number of fav tasks remaining is {{ taskStore.favCount }}</p>
        <div v-for="tasks in taskStore.fav">
            <TaskDetails :task="tasks" />
        </div>
    </div>

</template>

<script>
import { useTaskStore } from './stores/TaskStore';
import TaskDetails from './components/TaskDetails.vue';
import AddTasks from './components/AddTask.vue';
import { ref, onMounted, onUpdated } from 'vue';
export default {
    components: { TaskDetails, AddTasks },
    setup() {
        onMounted(() => taskStore.getTasks())
        onUpdated(() => taskStore.getTasks())
        const taskStore = useTaskStore();
        const fillter = ref('all');

        return { taskStore, fillter };
    }
}
</script>