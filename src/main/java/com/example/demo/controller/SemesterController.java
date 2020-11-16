package com.example.demo.controller;

import com.example.demo.entity.Semester;
import com.example.demo.service.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SemesterController {
    @Autowired
    private SemesterService semesterService;

    @GetMapping(value = "/semester")
    public ModelAndView index(Model model) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("semester_management");
        model.addAttribute("semesters", semesterService.getAllSemester() );
        model.addAttribute("new_semester", new Semester() );
        return new ModelAndView("semester_management");
    }

    @GetMapping(value = "/semester/delete/{id}")
    public String deleteSemester(@PathVariable(value = "id")long id) {
        System.out.println(id);
        semesterService.deleteSemester(id);
        return "redirect:/semester";
    }
}
