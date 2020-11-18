package com.example.demo.service;

import com.example.demo.entity.Semester;
import com.example.demo.entity.User;
import com.example.demo.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    public List<Semester> getAllSemester() {
        return semesterRepository.findAll();
    }

    public Semester addOrUpdateSemester(Semester semester) {
        semester.setUpdated(new Date());
        return semesterRepository.save(semester);
    }

    public void deleteSemester(Long id) {
        semesterRepository.deleteById(id);
    }

    public Semester getSemesterById(Long id) {
        if (semesterRepository.findById(id).isPresent()) {
            return semesterRepository.findById(id).get();
        }
        return null;
    }
}
