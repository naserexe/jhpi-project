const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const validateStudentInput = require("../validation/student");

const Student = require("../models/Student");

// Test Route
router.get("/test", (req, res) => res.json({ msg: "Works Student Route" }));

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
        router.get("/", (req, res) => {
          Student.find()
            .sort({ date: -1 })
            .then(students => res.json(students))
            .catch(err =>
              res.status(404).json({ nostudentfound: "No Student Found" })
            );
        });
      })
      .catch(err => res.json(err));
  }
);
module.exports = router;
