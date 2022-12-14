import { defineStore } from 'pinia';
import axios from "axios"
export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        name: "My Tasks",
        search: ''
    }),
    getters: {
        fav() {
            return this.tasks.filter(t => t.isFav)
        },
        search() {
            return this.tasks.filter(t => t.name.toLowerCase().includes(this.search))
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p
            }, 0)
        },
        allCount: (state) => {
            return state.tasks.length
        },


    },
    actions: {
        async getTasks() {
            const response = await axios.get('http://localhost:8080/tasks');
            response.statusText = 'OK' ? this.tasks = response.data : console.log(response.data);
        },
        async addTask(task) {
            const response = await axios.post('http://localhost:8080/addTask', task)
            console.log(response.data);
            response.statusText = 'OK' ? this.getTasks() : console.log(response.data);
        },
        async deleteTask(id) {
            const response = await axios.delete('http://localhost:8080/deleteTask/' + id)
            console.log(response.data);
            response.statusText = 'OK' ? this.getTasks() : console.log(response.data);

        },
        async toggleFav(id) {
            const response = await axios.put('http://localhost:8080/toggleFav/' + id)
            console.log(response.data);
            response.statusText = 'OK' ? this.getTasks() : console.log(response.data);
        }
    }
})