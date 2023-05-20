const express = require('express')
const router = express.Router()
const {getKorisnici,registracija,login,logout,updateProfil,getProfile,getKorisnikById,updateKorisnikByAdmin,deleteKorisnik} = require("../controllers/korisnikController")
const {checkIfUserIsLoggedIn, checkIfUserIsAdmin} = require("../middleware/authentication")

//neulogovani korisnik
router.post("/register",registracija)
router.post("/login",login)

//ulogovani korisnik
router.use(checkIfUserIsLoggedIn);

router.get("/logout",logout)
router.get("/profile/:id",getProfile)
router.put("/profile", updateProfil);

//admin
router.use(checkIfUserIsAdmin);

router.get("/", getKorisnici)
router.get("/:id", getKorisnikById)
router.put("/:id", updateKorisnikByAdmin)
router.delete("/:id", deleteKorisnik)



module.exports = router
