const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})



exports.view = (req, res) => {
  // Layout da pagina
  res.render("experience/experienceDay")


}