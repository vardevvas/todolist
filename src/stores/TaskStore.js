import { defineStore } from 'pinia';
import axios from "axios"
export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        name: "My Tasks",
    }),
    getters: {
        fav() {
            return this.tasks.filter(t => t.isFav)
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
            this.tasks = response.data;

        },
        async addTask(task) {
            const response = await axios.post('http://localhost:8080/addTask', task)
            console.log(response.data);
            // this.tasks.push(task)

        },
        async deleteTask(id) {
            axios.delete('http://localhost:8080/deleteTask/' + id).then(response => {
                if (response.data === "TaskDeleted") {
                    console.log(response.data);
                    // const task = this.tasks.filter(t => t.id !== id)
                    // this.tasks.pop(task)
                }
            })
                .catch(function (error) {
                    console.log(error.response)
                })
        },
        async toggleFav(id) {
            axios.put('http://localhost:8080/toggleFav/' + id).then(response => {
                if (response.data === "FavToggled") {
                    console.log(response.data);
                    // const task = this.tasks.find(t => t.id === id)
                    // task.isFav = !task.isFav
                }
            })
                .catch(function (error) {
                    console.log(error.response)
                })
        },
    }
})