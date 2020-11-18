package com.example.demo.controller;

import com.example.demo.dataset.SubjectDS;
import com.example.demo.entity.Major;
import com.example.demo.entity.Subject;
import com.example.demo.service.MajorService;
import com.example.demo.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

@Controller
public class SubjectController {

    @Autowired
    SubjectService subjectService;

    @Autowired
    MajorService majorService;

    @GetMapping(value = "/subject")
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView();
        List<Subject> subjects = subjectService.getAllSubjects();
        List<Major> majors = majorService.getALlMajors();
        mav.addObject("subjects", subjects);
        mav.setViewName("subject_management");
        mav.addObject("majors", majors);
        return mav;
    }

    @PostMapping(value = "/subject/insert")
    @ResponseBody
    public Subject insert(@RequestBody SubjectDS subjectDS) {
        Subject subject = new Subject();
        subject.setName(subjectDS.getName());
        subject.setDescription("");
        subject.setCode(subjectDS.getCode());
        subject.setMajor(majorService.findById(subjectDS.getMajor()));
        subject.setCreated(new Date());
        subject.setUpdated(new Date());
        subjectService.addOrUpdateSubject(subject);
        return subject;
    }
}
