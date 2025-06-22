package com.example.todo.repository.record;

import lombok.Data;
@Data
public class todoListRecord {

    private String id;
    private String content;
    private String deadline;
    private boolean completed;
    private String completed_at;
}
