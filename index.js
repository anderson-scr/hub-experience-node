//Carreagando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require("path")


// Configuracao
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
  // HandleBars
  app.engine('handlebars', handlebars.engine({defaulyLayout:'main'}))
  app.set("view engine", "handlebars")
  
  // Ariquivos estaticos
  app.use(express.static(path.join(__dirname, "/public")))


// Rotas
app.use("/", admin)

// Outros
const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`Server started on port localhost/${PORT}.`)
})
