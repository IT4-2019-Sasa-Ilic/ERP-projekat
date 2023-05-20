const express = require('express')
const router = express.Router()
const {getKategorije,getKategorijaById,createKategorija,deleteKategorija, updateKategorija} = require("../controllers/kategorijaController")
const {checkIfUserIsLoggedIn, checkIfUserIsAdmin} = require("../middleware/authentication")

//bilo koji korisnik
router.get("/", getKategorije)

//admin
router.use(checkIfUserIsLoggedIn)
router.use(checkIfUserIsAdmin)

router.get("/:id",getKategorijaById)
router.post("/",createKategorija)
router.put("/:id",updateKategorija)
router.delete("/:naziv",deleteKategorija)

module.exports = router
