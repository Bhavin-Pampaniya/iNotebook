import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "../components/Noteitem";

function Notes() {
  const Context = useContext(noteContext);
  console.log("this is context", Context);
  const { notes, getNotes,editNote,deleteNote } = Context;
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const [delid, setdelId] = useState(null)
  console.log("this is notes", notes);
  const ref = useRef(null);
  const refAlert = useRef(null);
  const refClose = useRef(null);
  const refDel = useRef(null);
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
    // getNotes();
    refClose.current.click();
  }
  const deleteNotewithAlert = ()=>{
    console.log("clicked bro");
    refDel.current.click();
    deleteNote(delid);
    // deleteNote(id);
  }
  const handleAlertClick = (id)=>{
    refAlert.current.click();
    setdelId(id)
    // deleteNotewithAlert(id);
  }
  return ( 
    <>
      {/* for delete */}
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={refAlert}>
  Launch static backdrop modal
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Are You Sure You Want To Delete The Note ?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-footer">
        <button ref={refDel} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button onClick={deleteNotewithAlert} type="button" className="btn btn-primary" id="yes">Yes</button>
      </div>
    </div>
  </div>
</div>
      {/* //for edit      */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} handleAlertClick={handleAlertClick} note={note} />; 
        })}
      </div>
    </>
  );
}

export default Notes;
