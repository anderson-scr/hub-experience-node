const express = require("express")
const router = express.Router()

// require("./Database/server")

router.get('/' , (req, res) => {
  res.render("experience/experienceDay")
})

router.get('/teste' , (req, res) => {
  res.send("Pagina de teste")
})

module.exports = router