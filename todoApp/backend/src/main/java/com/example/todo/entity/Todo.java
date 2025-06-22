package com.example.todo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String content;

    @Column(nullable = false)
    @JsonProperty("dueDate")
    private LocalDate deadline;

    @Column(nullable = false)
    private boolean completed = false;


    @Column(name = "completed_at",nullable = false)
    private LocalDate completed_at;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public LocalDate getCompleted_at() {
        return completed_at;
    }
    public void setCompleted_at(LocalDate completed_at) {
        this.completed_at= completed_at;
    }
}
