import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    console.log("called");
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token) return setNotes([])

      // API call/
      const header = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "auth-token":
        token,
      },
    };
    const response = await fetch(`${host}/api/notes/getnotes`, header);
    const data = await response.json();
    setNotes(data);
    console.log(data);
 
  };
  const addNote = async (title, description, tag) => {
    const token = localStorage.getItem("token");

    //API CALL
    const header = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          token,
      },
      body: JSON.stringify({ title, description, tag }),
    };
    const response = await fetch(`${host}/api/notes/addnote`, header);
    const data = await response.json();
    console.log(data);
    //Client side code
    const note = {
      _id: "6368eec6e73f22337sd58983ff3e",
      id: "6368e523e73f23798983ff1e",
      title: title,
      description: description,
      tag: tag,
      date: "2022-11-07T11:40:54.507Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    //API call
    const header = {
      method: "DELETE",
      headers: {
        "auth-token":
          token
      },
    };
    await fetch(`${host}/api/notes/deletenote/${id}`, header);
    await getNotes();
     
    //Client side code

    // setNotes(
    //   notes.filter((note) => {
    //     return note._id !== id;
    //   })
    // );
  };
  const editNote = async(id,title,description,tag) => {
    const token = localStorage.getItem("token");

    console.log("id is ",id);
    //API call
    const header = {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "auth-token":
          token
      },
      body: JSON.stringify({ title, description, tag }),
    };
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, header);
    const data = await response.json();
    console.log(data);
    //Client side code
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if(element._id === id){
      element.title = title;
      element.description = description;
      element.tag = tag;
      }
    }
    getNotes();
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
