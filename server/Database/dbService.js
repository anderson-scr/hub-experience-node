const mysql = require("mysql2")
const dotenv = require("dotenv")
const fs = require("fs")

let instance = null
dotenv.config()

const connection = mysql.createConnection({
  host: 'jbb8y3dri1ywovy2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'br6voiedx35dogde',
  password: 'vtp8haquvsoc461l',
  database: 'zbazdrpvxqq9qf6j',
})

// ssl : {
//   ca : fs.readFileSync(__dirname + '/certs/rds-combined-ca-bundle.pem'),
//   rejectUnauthorized: false
// }
connection.query("SELECT * FROM palestra", (err, res) => {
  if(err) {
    console.log(err)
  }
  console.log(res)
})

class DbService {
  static getDbServiceInstance() {
    return instance? instance : new DbService()
  }

  async queryTodosCards() {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = "SELECT * FROM palestra"
  
        connection.execute(pesquisa, (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {

      console.log(error)
    }
  }


  async queryPalestra(idPalestra) {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = "SELECT * FROM palestra WHERE id_palestra = ?"
  
        connection.execute(pesquisa, [idPalestra], (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            console.log(results)
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {

      console.log(error)
    }
  }



  async queryQntInscricao(idPalestra) {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = "SELECT count(*) FROM inscricao WHERE fk_palestra = ?"
  
        connection.execute(pesquisa, [idPalestra], (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {

      console.log(error)
    }
  }

  async queryInscricao(idPalestra) {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = "SELECT * FROM inscricao WHERE fk_usuario = ?"
  
        connection.execute(pesquisa, [idPalestra], (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            console.log(results)
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {

      console.log(error)
    }
  }


  async insertUsuario(idPalestra) {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = `INSERT INTO usuario(cpf, nome, data_nascimento, email, sexo, telefone, uso_informacoes, receber_email) VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?)`
  
        connection.execute(pesquisa, [idPalestra["iptCpf"], idPalestra["iptNome"], idPalestra["iptNasc"], idPalestra["iptEmail"], idPalestra["selectSexo"], idPalestra["iptTelefone"], idPalestra["checkUsoInfo"], idPalestra["checkRecebeEmail"]], (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            console.log(results)
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {
      console.log(error)
    }
  }



  async vinculaPalestraUsuario(idPalestra) {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = `INSERT INTO inscricao VALUES 
                (?, ?)`
  
        connection.execute(pesquisa, [idPalestra[0], idPalestra[1]], (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            console.log(results)
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {

      console.log(error)
    }
  }


  async atualizaInscricao(cpf, palestra) {
    try {
      const resultado = await new Promise((resolve, reject) => {
        const pesquisa = `UPDATE inscricao SET fk_palestra = ? where fk_usuario = ?`
  
        connection.execute(pesquisa, [palestra, cpf], (err, results) => {
            // Retorna o erro com a query se der alguma coisa
            if(err) reject(new Error(err.message))
            console.log(results)
            resolve(results)
          }
        )      
      })
      return resultado
    } 
    catch(error) {

      console.log(error)
    }
  }
}

module.exports = {DbService}