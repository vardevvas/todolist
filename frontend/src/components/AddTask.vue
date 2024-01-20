<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="I want to.." v-model="tasks">
        <button>Add</button>
    </form>

</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
export default {
    setup() {
        const taskStore = useTaskStore()
        const tasks = ref('')
        const handleSubmit = () => {
            if (tasks.value.length > 0) {
                taskStore.addTask({
                    name: tasks.value,
                    isFav: false,
                })
                tasks.value = ""
            }
        }
        return { handleSubmit, tasks }
    }
}
</script>