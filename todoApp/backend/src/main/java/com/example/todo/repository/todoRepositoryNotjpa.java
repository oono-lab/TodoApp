package com.example.todo.repository;

import com.example.todo.entity.Todo;

import java.util.List;

public interface todoRepositoryNotjpa {
    List<Todo> fetchAll();
}
