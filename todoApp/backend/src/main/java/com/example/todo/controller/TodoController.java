package com.example.todo.controller;

import com.example.todo.entity.Todo;
import com.example.todo.entity.User;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import com.example.todo.repository.todoRepositoryNotjpa;
import com.example.todo.service.TodoService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TodoController {
    private final TodoRepository todoRepository;
    private final todoRepositoryNotjpa todoRepositoryNotjpa;
    private final TodoService todoservice;
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();
        return ResponseEntity.ok(todos);
    }
    @Transactional
    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody Map<String, String> payload
                                        ) {
        String content = payload.get("content");
        LocalDate deadline = LocalDate.parse(payload.get("deadline"));

        if (content == null || content.length() > 100 || deadline.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("無効なToDoデータです");
        }

        Todo todo = new Todo();
        todo.setContent(content);
        todo.setDeadline(deadline);
        todoRepository.save(todo);

        return ResponseEntity.ok("ToDo作成成功");
    }
    @GetMapping("/notepad")
    public ResponseEntity<List<Todo>> getAllTodosNotjpa() {
        List<Todo> todos = todoservice.fetchAll();
        if (todos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(todos);
    }
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Todo> completeTodo(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            String completedAtStr = (String) request.get("completed_at");
            LocalDate completedAt = LocalDate.parse(completedAtStr);

            todoservice.markAsCompleted(id, completedAt);


            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoservice.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

