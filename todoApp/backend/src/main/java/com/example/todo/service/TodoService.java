package com.example.todo.service;

import com.example.todo.entity.Todo;
import com.example.todo.repository.mapper.todoListMapper;
import com.example.todo.repository.record.todoListRecord;
import com.example.todo.repository.record.todoRepositoryDb;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final todoRepositoryDb todoRepositoryDb;

    public List<Todo> fetchAll() {
        List<Todo> todoListRecords = todoRepositoryDb.fetchAll();

        return todoListRecords.stream()
                .map(record -> {
                    Todo todo = new Todo();
                    todo.setId(record.getId());
                    todo.setContent(record.getContent());
                    todo.setDeadline(record.getDeadline());
                    todo.setCompleted(record.isCompleted());
                    todo.setCompleted_at(record.getCompleted_at() != null ? record.getCompleted_at() : null);
                    return todo;
                })
                .collect(Collectors.toList());
    }

    public void markAsCompleted(Long id, LocalDate completedAt) {
        Todo todo = todoRepositoryDb.findById(id);
        if (todo == null) {
            throw new RuntimeException("Todo not found with id: " + id);
        }

        todo.setCompleted(true);
        todo.setCompleted_at(completedAt);
        todoRepositoryDb.save(todo);

    }

    public void deleteById(Long id) {
        Todo todo = todoRepositoryDb.findById(id);
        todoRepositoryDb.delete(todo);
    }

}

