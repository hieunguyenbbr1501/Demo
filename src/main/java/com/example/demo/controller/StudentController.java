package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class StudentController {
    @GetMapping(value = "/")
    public String redirect() {
        return "redirect:/student";
    }
    @GetMapping(value = "/student")
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("student_management");
        return new ModelAndView("student_management");
    }
}
