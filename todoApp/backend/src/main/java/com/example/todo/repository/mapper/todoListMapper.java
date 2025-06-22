package com.example.todo.repository.mapper;
import com.example.todo.repository.record.todoListRecord;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface todoListMapper {
    List<todoListRecord> fetchAll();
    void markAsCompleted(Long id);
    void delete(Long id);
}
