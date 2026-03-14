const express = require("express")
const fs = require("fs")

const app = express()
const port = 3000

const file = "notes.json"

function loadNotes() {
  if (!fs.existsSync(file)) {
    return []
  }

  const data = fs.readFileSync(file)
  return JSON.parse(data)
}

app.get("/", (req, res) => {

  const notes = loadNotes()

  let html = `
  <html>
  <head>
  <title>My Notes</title>

  <style>
  body{
    font-family: Arial;
    background:#f2f2f2;
    padding:40px;
  }

  .container{
    max-width:600px;
    margin:auto;
    background:white;
    padding:20px;
    border-radius:10px;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
  }

  input{
    padding:10px;
    width:70%;
    font-size:16px;
  }

  button{
    padding:10px 15px;
    font-size:16px;
    cursor:pointer;
  }

  .note{
    background:#fafafa;
    padding:10px;
    margin-top:10px;
    border-radius:5px;
  }

  </style>
  </head>

  <body>

  <div class="container">

  <h1>My Notes</h1>

  <form action="/add">
    <input name="note" placeholder="Write a note..." />
    <button>Add</button>
  </form>

  <hr>
  `

  notes.forEach((note, index) => {
    html += `<div class="note">${index + 1}. ${note}</div>`
  })

  html += `
  </div>
  </body>
  </html>
  `

  res.send(html)

})

app.get("/add", (req, res) => {

  const notes = loadNotes()

  const note = req.query.note

  if (note) {
    notes.push(note)
    fs.writeFileSync(file, JSON.stringify(notes, null, 2))
  }

  res.redirect("/")

})

app.listen(port, () => {
  console.log("Server running on http://localhost:3000")
})