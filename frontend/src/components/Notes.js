import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "../components/Noteitem";

function Notes() {
  const Context = useContext(noteContext);
  console.log("this is context", Context);
  const { notes, getNotes,editNote } = Context;
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  console.log("this is notes", notes);
  const ref = useRef(null);
  // const refAlert = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const handleChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    // setNote({title:note.etitle,description:note.edescription,tag:note.etag})

  }
  const handleClick = ()=>{
    console.log(note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    getNotes();
  }
  // const deleteAlert = ()=>{
  //   refAlert.current.click();
  // }
  return (
    <>
      {/* for delete */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">No</button>
        <button type="button" class="btn btn-primary" id="yes">Yes</button>
      </div>
    </div>
  </div>
</div>
      {/* //for edit      */}
      <button
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                  value={note.etitle}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={handleChange}
                  value={note.edescription}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  onChange={handleChange}
                  value={note.etag}
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote}  note={note} />; 
        })}
      </div>
    </>
  );
}

export default Notes;
