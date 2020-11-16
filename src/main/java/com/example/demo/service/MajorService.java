package com.example.demo.service;

import com.example.demo.entity.Major;
import com.example.demo.repository.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class MajorService {

    @Autowired
    private MajorRepository majorRepository;

    public List<Major> getALlMajors() {
        return majorRepository.findAll();
    }

    public Major addOrUpdate(Major major)  {
        major.setUpdated(new Date());
        return majorRepository.save(major);
    }

    public void deleteMajor(Long id) {
        majorRepository.deleteById(id);
    }

    public Major findById(Long id) {
        if (majorRepository.findById(id).isPresent()) {
            return majorRepository.findById(id).get();
        }
        return null;
    }
}
