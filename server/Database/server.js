const express = require("express")
const app = express()
const cors = require("cors")
const dbService = require("./dbService")
const dotenv = require("dotenv")
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.get('/', (request, response) => {
  console.log("entro getAll sem getAll")
  const classeBanco = new dbService.DbService()
  const resultado = classeBanco.queryTodosCards()
  // console.log(resultado)

  resultado
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
})



app.get('/getPalestra/:idPesquisa', (request, response) => {
  const { idPesquisa } = request.params

  const classeBanco = new dbService.DbService()
  const resultado = classeBanco.queryPalestra(idPesquisa)

  resultado
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
})



app.get('/getQntInscricao/:idPesquisa', (request, response) => {
  const { idPesquisa } = request.params

  const classeBanco = new dbService.DbService()
  const resultado = classeBanco.queryQntInscricao(idPesquisa)

  resultado
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
})



app.post('/insert', (request, response) => {
  console.log("Inseri inscricao pela primeira vez")
  const classeBanco = new dbService.DbService()
  const resultado = classeBanco.insertUsuario(request.body)


  resultado
    .then(classeBanco.vinculaPalestraUsuario([request.body["iptCpf"], request.body["id_palestra"]]))
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
})




app.get('/getInscricao/:idPesquisa', (request, response) => {
  const { idPesquisa } = request.params

  const classeBanco = new dbService.DbService()
  const resultado = classeBanco.queryInscricao(idPesquisa)

  resultado
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
})




app.patch('/update', (request, response) => {
  console.log("Executei update")
  console.log(request.body)

  const { cpf, palestra } = request.body
  const classeBanco = new dbService.DbService()

  const resultado = classeBanco.atualizaInscricao(cpf, palestra)
  resultado
    .then(data => response.json({ data: data }))
    .catch(erro => console.log(erro))
}) 


app.listen(5005, () => console.log(`Database is running on port ${process.env.PORT}`))