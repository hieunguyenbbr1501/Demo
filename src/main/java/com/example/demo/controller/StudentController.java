package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Controller
public class StudentController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/")
    public String redirect() {
        return "redirect:/student";
    }
    @GetMapping(value = "/student")
    public ModelAndView index(Model model) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("student_management");
        model.addAttribute("students", userService.getAllStudents() );
        return new ModelAndView("student_management");
    }

    @PostMapping(value = "/student")
    public String updateUser(@RequestBody User user) {
        System.out.println(user.getEmail() + " "
                +user.getRole_id() + " "
                + user.getMajor_id() + " "
                + user.getStudent_code() + " "
                + user.getPhone() + " "
                + user.getPassword() + " " +
                user.getFirst_name() + " "+
                user.getLast_name());
        //userService.addOrUpdateUser(user);
        return "redirect:/student";
    }
    @DeleteMapping(value = "/student/{id}")
    public String deleteUser(@PathVariable(value = "id")long id) {
        userService.deleteUser(id);
        return "redirect:/";
    }
    @PutMapping(value = "/student")
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
