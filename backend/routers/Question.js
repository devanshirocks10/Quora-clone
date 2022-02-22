const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const questionDB = require("../models/Questions");
const isAuthenticated = require("../controller/requestAuthenticator");
const Answers = require("../models/Answers");

router.post("/", async (req, res) => {
  console.log(req.body.userDetails);
  console.log(typeof req.body.userDetails);
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        userId: req.body.userId,
      })
      .then(() => {
        res.status(201).send({
          message: "Question added successfully",
          status: true,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
          status: false,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  
  questionDB.aggregate([
    {
      $lookup: {
          from: "answers", 
          localField: "_id",
          foreignField: "questionId",
          as: "allAnswers"
      }
  },
  {
    $lookup: {
        from: "users", 
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
    }
}
  ]).exec().then((doc) => {
    res.status(200).send(doc)
  })
});


router.get("/:id", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  questionDB.aggregate([
    {
      $match: {userId: mongoose.Types.ObjectId(req.params.id) }
    },
    {
      $lookup: {
          from: "answers", 
          localField: "_id",
          foreignField: "questionId",
          as: "allAnswers"
      }
  },
  {
    $lookup: {
        from: "users", 
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
    }
},
  ]).exec().then((doc) => {
    res.status(200).send(doc)
  })
});


module.exports = router;
