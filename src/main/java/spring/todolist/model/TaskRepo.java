package spring.todolist.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<TaskModel, Long> {
}
