import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  console.log("this is props", props);
  console.log(props.note.title);
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
              {note.tag}
            </span>
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i class="fa fa-duotone fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
              <i class="fa fa-duotone fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
