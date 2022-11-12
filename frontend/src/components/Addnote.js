import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';


function Addnote() {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title:"",description:"",tag:""});
  const handleAdd = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }
  const handleChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  return (
    <>
    <h2>Add a Note</h2> 
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} required/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
      </form>
    </>
  )
}

export default Addnote
