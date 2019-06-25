const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const validateStudentInput = require("../validation/student");
const validateSearchInput = require("../validation/search");

const Student = require("../models/Student");

// Test Route
router.get("/filter", (req, res) => {
  const { department, semester, shift } = req.query;
  let query = {};

  if (department && department != "undefined") {
    query.department = department;
  }

  if (semester && semester != "undefined") {
    query.semester = semester;
  }

  if (shift && shift != "undefined") {
    query.shift = shift;
  }

  Student.find(query)
    .then(result => {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({ QueryError: "Nothing found in your query" });
      }
    })
    .catch(err => res.json(err));
});

//GEt Current student
router.get("/:id", (req, res) => {
  Student.findOne({ _id: req.params.id })
    .then(student => res.json(student))
    .catch(err => res.json(err));
});

// Add Student
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Student.findOne({ roll: req.body.roll }).then(student => {
      if (student) {
        errors.roll = "Roll already exist";
        return res.status(400).json(errors);
      } else {
        const newStudent = new Student({
          name: req.body.name,
          roll: req.body.roll,
          department: req.body.department,
          semester: req.body.semester,
          shift: req.body.shift
        });

        newStudent
          .save()
          .then(student => res.json(student))
          .catch(err => res.json(err));
      }
    });
  }
);

// Get Student information
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.find()
      .sort({ date: -1 })
      .then(students => res.json(students))
      .catch(err =>
        res.status(404).json({ nostudentfound: "No Student Found" })
      );
  }
);

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newInfo = {
      name: req.body.name,
      roll: req.body.roll,
      department: req.body.department,
      semester: req.body.semester,
      shift: req.body.shift
    };

    Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: newInfo
      },
      { new: true }
    )
      .then(student => {
        if (!student) {
          return res.status(404).json({ msg: "Not found by id" });
        }

        res.json(student);
      })
      .catch(err => res.json({ err: "Update Error" }));
  }
);

// Delete student
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findByIdAndRemove({ _id: req.params.id })
      .then(res => {
        res.status(404).json({ nostudentfound: "No Student Found" });
      })
      .catch(err => res.json(err));
  }
);

// Student search route
router.post("/search", (req, res) => {
  const { errors, isValid } = validateSearchInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Student.findOne({ roll: req.body.search })
    .then(result => {
      if (result) {
        res.json(result);
        errors.search = "";
      } else {
        errors.search = "Student not found";
        res.status(404).json(errors);
      }
    })
    .catch(err => res.status(404).json(err));
});

// Filter result by Department
router.get("/filter/department/:department", (req, res) => {
  Student.find({ department: req.params.department })
    .then(filterResult => {
      if (filterResult.length > 0) {
        res.json(filterResult);
      } else {
        res.json({ msg: `${req.params.department} has no student` });
      }
    })
    .catch(err => res.status(404).json(err));
});

// Filter result by Semester
router.get("/filter/semester/:semester", (req, res) => {
  Student.find({ semester: req.params.semester })
    .then(filterResult => {
      if (filterResult.length > 0) {
        res.json(filterResult);
      } else {
        res.json({ msg: `${req.params.semester} has no student` });
      }
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
