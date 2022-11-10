require("./db/connection")
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors());
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
  
app.get("/",(req,res)=>{ 
    res.send("hello world");

})

app.listen(port, () => {
  console.log(`inotebook backend is listening at http://localhost:${port}`)
})