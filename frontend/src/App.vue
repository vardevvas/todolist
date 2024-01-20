<template>
    <header>
        <img src="./assets/logo.svg" alt="Pinia">
        <h1>{{ name }}</h1>
    </header>
    <div class="new-task-form">
        <AddTasks />
    </div>
    <div class="filter">
        <mat-icon matPrefix>search</mat-icon>
        <input type="text" v-model="searchbox" class="search-input" placeholder="search by name...">
        <button @click="fillter = 'all'">All Tasks</button>
        <button @click="fillter = 'favs'">Fav Tasks</button>
    </div>
    <div class="task-list" v-if="fillter === 'all'">
        <p> The number of tasks remaining is {{ allCount }}</p>
        <div v-for="task in filteredTasks()">
            <TaskDetails :task="task" />
        </div>
    </div>
    <div class="task-list" v-if="fillter === 'favs'">
        <p>The number of fav tasks remaining is {{ favCount }}</p>
        <div v-for="favtasks in fav">
            <TaskDetails :task="favtasks" />
        </div>
    </div>

</template>

<script>
import { useTaskStore } from './stores/TaskStore';
import TaskDetails from './components/TaskDetails.vue';
import AddTasks from './components/AddTask.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
export default {
    components: { TaskDetails, AddTasks },
    setup() {
        const taskStore = useTaskStore();
        taskStore.getTasks()
        const fillter = ref('all');
        const searchbox = ref('')
        const { tasks, name, fav, allCount, favCount } = storeToRefs(taskStore);
        console.log(tasks.value);
        function filteredTasks() {
            return searchbox === '' ? tasks.value : tasks.value.filter(t => t.name.toLowerCase().includes(searchbox.value.toLowerCase()))
        }
        return { taskStore, fillter, tasks, name, fav, allCount, favCount, searchbox, filteredTasks };
    }
}
</script>