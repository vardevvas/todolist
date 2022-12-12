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
            try {
                const response = await axios.get('http://localhost:8080/tasks');
                this.tasks = response.data;
            }
            catch (error) {
                console.log(error)
            }
        },
        async addTask(task) {
            await axios.post('http://localhost:8080/addTask', task).then(response => {
                if (response.data === "TaskAdded") {
                    console.log(response.data);
                    this.tasks.push(task)
                }
            })
                .catch(function (error) {
                    console.log(error.response)
                })
        },
        async deleteTask(id) {
            await axios.delete(`http://localhost:8080/deleteTask/${id}`).then(response => {
                if (response.data === "TaskDeleted") {
                    console.log(response.data);
                    const task = this.tasks.find(t => t.id === id)
                    this.tasks.pop(task)
                }
            })
                .catch(function (error) {
                    console.log(error.response)
                })
        },
        async toggleFav(id) {
            await axios.put(`http://localhost:8080/toggleFav/${id}`).then(response => {
                if (response.data === "FavToggled") {
                    console.log(response.data);
                    const task = this.tasks.find(t => t.id === id)
                    task.isFav = !task.isFav
                }
            })
                .catch(function (error) {
                    console.log(error.response)
                })
        },
    }
})