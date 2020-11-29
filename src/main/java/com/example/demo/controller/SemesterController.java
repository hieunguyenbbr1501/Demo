//package com.example.demo.controller;
//
//import com.example.demo.entity.Semester;
//import com.example.demo.service.SemesterService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.ModelAndView;
//
//@Controller
//public class SemesterController {
//    @Autowired
//    private SemesterService semesterService;
//
//    @GetMapping(value = "/semester")
//    public ModelAndView index(Model model) {
//        ModelAndView mav = new ModelAndView();
//        mav.setViewName("semester_management");
//        model.addAttribute("semesters", semesterService.getAllSemester() );
//        return new ModelAndView("semester_management");
//    }
//
//    @PostMapping(value = "/manager/semester")
//    @ResponseBody
//    public Semester add(@RequestBody Semester semester) {
//        return semesterService.addOrUpdateSemester(semester);
//    }
//    @DeleteMapping(value = "/manager/semester/{id}")
//    public ResponseEntity delete(@PathVariable(value = "id")long id) {
//        semesterService.deleteSemester(id);
//        return ResponseEntity.ok().build();
//    }
//    @PutMapping(value = "/manager/semester")
//    @ResponseBody
//    public Semester update(@RequestBody Semester semester) {
//        Semester old = semesterService.getSemesterById(semester.getId());
//        old.setName(semester.getName());
//        old.setDescription(semester.getDescription());
//        old.setYear(semester.getYear());
//        return semesterService.addOrUpdateSemester(old);
//    }
//}
