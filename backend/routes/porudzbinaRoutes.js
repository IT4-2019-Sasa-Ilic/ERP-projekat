const express = require('express')
const router = express.Router()
const { getPorudzbineKorisnika,getPorudzbinaById,createPorudzbina,getPorudzbineAdmin,updatePorudzbinaIsporucena,updatePorudzbinaPlacena, deletePorudzbina} = require("../controllers/porudzbinaController")
const { checkIfUserIsLoggedIn, checkIfUserIsAdmin } = require('../middleware/authentication')

router.put("/paid/:id", updatePorudzbinaPlacena);


// ulogovani korisnik
router.use(checkIfUserIsLoggedIn)

router.get("/", getPorudzbineKorisnika)
router.get("/:id", getPorudzbinaById);
router.post("/", createPorudzbina);

// admin
router.use(checkIfUserIsAdmin)

router.get("/all/admin", getPorudzbineAdmin)
router.put("/delivered/:id", updatePorudzbinaIsporucena);
router.delete('/:id',deletePorudzbina)



module.exports = router