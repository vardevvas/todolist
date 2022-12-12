package spring.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import spring.todolist.model.TaskModel;
import spring.todolist.service.TodoListService;

@CrossOrigin("http://localhost:5173/")
@RestController
public class TodoListController {

    @Autowired
    TodoListService serviceInstance;

    @GetMapping("/tasks")
    ResponseEntity<List<TaskModel>> getTasks() {
        return new ResponseEntity<>(serviceInstance.getTasks(), HttpStatus.OK);
    }

    @PostMapping("/addTask")
    ResponseEntity<String> addTask(@RequestBody TaskModel task) {
        return new ResponseEntity<>(serviceInstance.addTask(task), HttpStatus.OK);
    }

    @DeleteMapping("/deleteTask/{id}")
    ResponseEntity<String> deleteTask(@PathVariable Long id) {
        return new ResponseEntity<>(serviceInstance.deleteTask(id), HttpStatus.OK);
    }

    @PutMapping("/toggleFav/{id}")
    ResponseEntity<String> toggleFav(@PathVariable Long id) {
        return new ResponseEntity<>(serviceInstance.toggleFav(id), HttpStatus.OK);
    }

}
