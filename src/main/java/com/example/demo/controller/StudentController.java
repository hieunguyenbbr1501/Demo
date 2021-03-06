package com.example.demo.controller;

import com.example.demo.entity.Major;
import com.example.demo.service.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import java.util.List;

@Controller
public class StudentController {

    @Autowired
    private UserService userService;
    @Autowired
    private MajorService majorService;

    @GetMapping(value = "/")
    public String redirect() {
        return "redirect:/student";
    }

    @GetMapping(value = "/student")
    public ModelAndView index(Model model) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("student_management");
        List<User> students = userService.getAllStudents();
        List<Major> majors = majorService.getALlMajors();
        model.addAttribute("students", students);
        model.addAttribute("majors", majors);
        return new ModelAndView("student_management");
    }

    @PostMapping(value = "/manager/student")
    @ResponseBody
    public User add(@RequestBody User user) {
        return userService.addOrUpdateUser(user);
    }

    @DeleteMapping(value = "/manager/student/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/manager/student")
    @ResponseBody
    public User update(@RequestBody User user) {
        User old = userService.getUserById(user.getId());
        old.setStudent_code(user.getStudent_code());
        old.setPassword(user.getPassword());
        old.setLast_name(user.getLast_name());
        old.setFirst_name(user.getFirst_name());
        old.setEmail(user.getEmail());
        old.setPhone(user.getPhone());
        old.setMajor_id(user.getMajor_id());
        old.setRole_id(user.getRole_id());
        return userService.addOrUpdateUser(old);
    }
}
