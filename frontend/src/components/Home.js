import React from 'react'
import Addnote from './Addnote';
import Notes from './Notes';

function Home() {
  

  // console.log(a);
  return (
    <div>
      <h1 className='text-center my-3'>Welcome to iNotebook</h1>
      <Addnote/>
      <Notes/>
    </div> 
  )
}

export default Home;