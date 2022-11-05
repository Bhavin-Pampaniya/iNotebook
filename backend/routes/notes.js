const express = require("express");
const { authUser } = require("../middleware/authUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");

// ROUTE 1: Fetch notes using: POST "/api/auth/getnotes". Login required
router.get("/getnotes", authUser, async (req, res) => {
  try {
    const notes = await Note.find({ userid: req.user.id });
    res.send(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Adding notes using: POST "/api/auth/addnote". Login required
router.post(
  "/addnotes",
  authUser,
  [
    body("title", "title should be atleast of 3 character").isLength({
      min: 3,
    }),
    body("description", "length of description should be atleast 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        id: req.user.id,
      });
      const createdNote = await note.save();
      res.status(201).json(createdNote);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Updating note using: PUT "/api/auth/updatenote". Login required
router.put("/updatenote/:id",authUser,async(req,res)=>{
  try{
  const {title,description,tag} = req.body;
  const id = req.params.id;
  const note = await Note.findById(id);
  if(!note) return res.status(500).send("not found");

  // const note = await Note.findById(id);
  if(note.id.toString() !== req.user.id){
    return res.status(401).send("not allowed");
  }

  await note.updateOne({ 
      title:title,
      description:description,
      tag:tag
  });

  console.log(note);
  // const updatedNote = await note.updateOne({ 
  //   title:title,
  //   description:description,
  //   tag:tag
  // },{new:true});
  await note.save();
  res.status(200).json(note);
} catch (error) {
  res.status(500).json({e:"Internal server error",error:error.message});
  // res.status(500).send(error.message);
}
})

// ROUTE 4: Deleting note using: DELETE "/api/auth/deletebite". Login required
router.delete("/deletenote/:id",authUser,async(req,res)=>{
  try{
  const id = req.params.id;
  const note = await Note.findById(id);
  if(note.id.toString() !== req.user.id){
    return res.status(401).send("not allowed");
  }
  await note.deleteOne();
  res.status(410).send("note deleted");
} catch (error) {
  res.status(500).json({e:"Internal server error",error:error.message});
  // res.status(500).send(error.message);
}
})

module.exports = router;
