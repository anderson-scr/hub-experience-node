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
  app.engine('handlebars', handlebars.engine({
    defaulyLayout:'main'
  }))
  
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



// Verifica se ja existe um cpf cadastrado em alguma palestra na tabela de inscricao
app.get('/getCpfInscricao/:idCpf', (request, response) => {
  const { idCpf } = request.params

  const resultado = new Promise((resolve, reject) => {
    const pesquisa = "SELECT * FROM inscricao WHERE fk_usuario = ?"

    pool.execute(pesquisa, [idCpf], (err, results) => {
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



// Cria um novo cadastro na tabela de usuarios do banco de dados
app.post("/novoCadastro", (req, res) => {

  const resultado = new Promise((resolve, reject) => {
    const pesquisa = `INSERT INTO usuario(cpf, nome, data_nascimento, email, sexo, telefone, uso_informacoes, receber_email) VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)`

    pool.execute(pesquisa, [req.body["iptCpf"], req.body["iptNome"], req.body["iptNasc"], req.body["iptEmail"], req.body["selectSexo"], req.body["iptTelefone"], req.body["checkUsoInfo"], req.body["checkRecebeEmail"]], (err, results) => {
        // Retorna o erro com a query se der alguma coisa
        if(err) reject(new Error(err.message))
        console.log(results)
        resolve(results)
      }
    )      
  })
})



// Adiciona a inscricao na tabela de inscricoes, apos o cadastro do cara.
app.post("/insereInscricao", (req, res) => {
  const resultado = new Promise((resolve, reject) => {
    const pesquisa = `INSERT INTO inscricao VALUES (?, ?)`

    pool.execute(pesquisa, [req.body["cpf"], req.body["palestra"]], (err, results) => {
        // Retorna o erro com a query se der alguma coisa
        if(err) reject(new Error(err.message))
        console.log(results)
        resolve(results)
      }
    )      
  })
})


// Atualiza o cadastro do cara no banco de dados na tabela de inscricoes.
app.patch("/atualizaCadastro", (req, res) => {
  const resultado = new Promise((resolve, reject) => {
    const pesquisa = `UPDATE inscricao set fk_palestra = ? where fk_usuario = ?;`

    pool.execute(pesquisa, [req.body["palestra"], req.body["cpf"]], (err, results) => {
        // Retorna o erro com a query se der alguma coisa
        if(err) reject(new Error(err.message))
        console.log(results)
        resolve(results)
      }
    )
  })
})


// Outros
const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`Server started on port localhost/${PORT}.`)
})

