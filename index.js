//Carreagando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const path = require("path")
const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()



// Configuracao
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
  // HandleBars
  app.engine('handlebars', handlebars.engine({defaulyLayout:'main'}))
  app.set("view engine", "handlebars")
  
  // Ariquivos estaticos
  app.use(express.static(path.join(__dirname, "/public")))



// Banco
const pool = mysql.createPool({
  connectionLimit:  9,
  host:             process.env.HOST,
  user:             process.env.USER,
  password:         process.env.PASSWORD,
  database:         process.env.DATABASE
})
pool.getConnection((err, connection) => {
  if(err) throw err; //Erro na conexcao

  console.log(`Connected as ID ${connection.threadId}.`) //Conexcao funcionou
})
const routes = require("./server/routes/user")
app.use('/', routes)





// Outros
const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`Server started on port localhost/${PORT}.`)
})


// Querys banco de dados
app.get('/getPalestraModal/:idPalestrante', (request, response) => {
  const { idPalestrante } = request.params

  const resultado = new Promise((resolve, reject) => {
    const pesquisa = "SELECT * FROM palestra WHERE id_palestra = ?"

    pool.execute(pesquisa, [idPalestrante], (err, results) => {
        // Retorna o erro com a query se der alguma coisa
        if(err) reject(new Error(err.message))

        resolve(results)
      }
    )      
  })

  resultado
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
})