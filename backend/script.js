require("./db/connection")
const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get("/",(req,res)=>{
    res.send("hello world");

})

app.listen(port, () => {
  console.log(`inotebook is listening at http://localhost:${port}`)
})