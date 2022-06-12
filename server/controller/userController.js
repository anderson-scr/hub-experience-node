const mysql = require("mysql2")
const pool = mysql.createPool({
  connectionLimit:  9,
  host:             process.env.HOST,
  user:             process.env.USER,
  password:         process.env.PASSWORD,
  database:         process.env.DATABASE
})


exports.loadCards = (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err; //Erro na conexcao
    console.log(`Connected as ID ${connection.threadId}.`) //Conexcao funcionou
    
    const pesquisa = "SELECT * FROM palestra LIMIT 40 OFFSET 1"
    connection.execute(pesquisa, (err, cards) => {
      connection.release()

      if(!err) {
        res.render('experience/experienceDay', {cards})
      } else {
        console.log(err)
      }
    })
  })
}