package com.example.todo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {  // ← 追加
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {  // ← 追加
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
