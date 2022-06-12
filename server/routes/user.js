const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")


router.get("/", userController.loadCards)

router.get("", (req, res) => {
  res.render("experience/experienceDay")
})

module.exports = router