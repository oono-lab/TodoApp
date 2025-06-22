package com.example.todo.repository.record;

import com.example.todo.entity.Todo;
import com.example.todo.repository.mapper.todoListMapper;
import com.example.todo.repository.todoRepositoryNotjpa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class todoRepositoryDb implements todoRepositoryNotjpa {
    private final todoListMapper todoListmapper;
    @Override
    public List<Todo> fetchAll(){
        List<todoListRecord> todoListRecords = todoListmapper.fetchAll();
        return todoListRecords.stream()
                .map(record -> {
                    Todo todo = new Todo();
                    todo.setId(Long.valueOf(record.getId()));
                    todo.setContent(record.getContent());
                    todo.setDeadline(LocalDate.parse(record.getDeadline()));
                    todo.setCompleted(record.isCompleted());
                    String completedAtStr = record.getCompleted_at();
                    if (completedAtStr != null) {
                        todo.setCompleted_at(LocalDate.parse(completedAtStr));
                    } else {
                        todo.setCompleted_at(null);
                    }
                    return todo;
                })
                .toList();
    }

    public Todo findById(Long id) {
        List<todoListRecord> todoListRecords = todoListmapper.fetchAll();
        return todoListRecords.stream()
                .filter(record -> record.getId().equals(id.toString()))
                .findFirst()
                .map(record -> {
                    Todo todo = new Todo();
                    todo.setId(Long.valueOf(record.getId()));
                    todo.setContent(record.getContent());
                    todo.setDeadline(LocalDate.parse(record.getDeadline()));
                    todo.setCompleted(record.isCompleted());
                    String completedAtStr = record.getCompleted_at();
                    if (completedAtStr != null) {
                        todo.setCompleted_at(LocalDate.parse(completedAtStr));
                    } else {
                        todo.setCompleted_at(null);
                    }
                    return todo;
                })
                .orElse(null);
    }

    public void save(Todo todo) {
        todoListmapper.markAsCompleted(todo.getId());// Assuming you have a method to save the Todo entity
    }
    public void delete(Todo todo) {
        todoListmapper.delete(todo.getId());
    }


}
