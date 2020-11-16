package com.example.demo.controller;

import com.example.demo.dataset.MajorDS;
import com.example.demo.entity.Major;
import com.example.demo.service.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class MajorController {

    @Autowired
    MajorService majorService;


    @GetMapping(value = "/major")
    public ModelAndView index() {
        List<Major> majors = majorService.getALlMajors();
        ModelAndView mav = new ModelAndView("major_management");
        mav.addObject("majors", majors);
        return mav;
    }

    @PutMapping(value = "/major/update")
    @ResponseBody
    public Major update(@RequestBody Major major) {
        Major old = majorService.findById(major.getId());
        if (old != null) {
            old.setName(major.getName());
            old.setDescription(major.getDescription());
            return majorService.addOrUpdate(old);
        }
        return null;
    }

    @PostMapping(value = "/major/insert")
    @ResponseBody
    public Major insert(@RequestBody Major major) {
        if (major != null) {
            return majorService.addOrUpdate(major);
        }
        return null;
    }
}
