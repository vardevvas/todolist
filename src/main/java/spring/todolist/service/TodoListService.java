package spring.todolist.service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import spring.todolist.model.TaskModel;
import spring.todolist.model.TaskRepo;

@Service
public class TodoListService {

    @Autowired
    TaskRepo repoInstance;

    public List<TaskModel> getTasks() {
        List<TaskModel> tasks = repoInstance.findAll();
        tasks.sort(Comparator.comparing(TaskModel::getId));
        return tasks;
    }

    public String addTask(TaskModel task) {
        repoInstance.save(task);
        return "Task Saved";
    }

    public String deleteTask(Long id) {
        repoInstance.deleteById(id);
        return "TaskDeleted";
    }

    public String toggleFav(Long id) {
        TaskModel task = repoInstance.getReferenceById(id);
        task.setIsFav(!task.getIsFav());
        repoInstance.save(task);

        return "FavToggled";
    }

}