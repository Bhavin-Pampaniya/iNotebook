import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const initialNotes = [
        {
          "_id": "6368e54fe73f23798983ff22",
          "id": "6368e523e73f23798983ff1e",
          "title": "bhavin",
          "description": "hello bro kya haal hai",
          "tag": "personal",
          "date": "2022-11-07T11:00:31.806Z",
          "__v": 0
        },
        {
          "_id": "6368eec6e73f23798983ff3e",
          "id": "6368e523e73f23798983ff1e",
          "title": "bhavin 2",
          "description": "hello bro kya haal hai",
          "tag": "personal",
          "date": "2022-11-07T11:40:54.507Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(initialNotes)
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;