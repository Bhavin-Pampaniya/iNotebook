import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    console.log("called");
    // API call/
    const header = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2OGU1MjNlNzNmMjM3OTg5ODNmZjFlIn0sImlhdCI6MTY2NzgyMTM1N30.8LngCJ5nKtj83YW8X6eGaY3EOzciu9Ek_S7ejYKFHVg",
      },
    };
    const response = await fetch(`${host}/api/notes/getnotes`, header);
    const data = await response.json();
    setNotes(data);
    console.log(data);
  };
  const addNote = async (title, description, tag) => {
    //API CALL
    const header = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2OGU1MjNlNzNmMjM3OTg5ODNmZjFlIn0sImlhdCI6MTY2NzgyMTM1N30.8LngCJ5nKtj83YW8X6eGaY3EOzciu9Ek_S7ejYKFHVg",
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
    //API call
    const header = {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2OGU1MjNlNzNmMjM3OTg5ODNmZjFlIn0sImlhdCI6MTY2NzgyMTM1N30.8LngCJ5nKtj83YW8X6eGaY3EOzciu9Ek_S7ejYKFHVg",
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
    console.log("id is ",id);
    //API call
    const header = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2OGU1MjNlNzNmMjM3OTg5ODNmZjFlIn0sImlhdCI6MTY2NzgyMTM1N30.8LngCJ5nKtj83YW8X6eGaY3EOzciu9Ek_S7ejYKFHVg",
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
