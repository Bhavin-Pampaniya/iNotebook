import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function Home() {
  const Context = useContext(noteContext);
  console.log(Context);
  const {notes,setNotes} = Context;

  // console.log(a);
  return (
    <div>
      <h1 className='text-center my-3'>Welcome to iNotebook</h1>

      <h2>Add a Note</h2> 
      <form className='my-3'>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1"/>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <h2>Your Notes</h2>
      {notes.map((note)=>{
        return note.tag
      })}
    </div> 
  )
}

export default Home;