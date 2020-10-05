package com.example.demo.service;

import com.example.demo.entity.Class;
import com.example.demo.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    public void addOrUpdateClass(Class c) {
        classRepository.save(c);
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}
