const express = require('express')
const router = express.Router()
const {getProizvodi,getProzvodById,getProizvodiByKategorija,
getProizvodiAdmin,deleteProizvod, createProizvod,updateProizvod, uploadImages, deleteImages, getBestSellers} = require("../controllers/proizvodController")
const {checkIfUserIsLoggedIn, checkIfUserIsAdmin} = require("../middleware/authentication")

//neulogovani korisnik
router.get("/", getProizvodi)
router.get("/category/:category", getProizvodiByKategorija)
router.get("/search/:query",getProizvodi)
router.get("/product/:id",getProzvodById)
router.get("/best-sellers",getBestSellers)

//admin
router.use(checkIfUserIsLoggedIn)
router.use(checkIfUserIsAdmin)
router.get("/admin",getProizvodiAdmin);
router.delete("/admin/:id",deleteProizvod);
router.post("/admin",createProizvod)
router.put("/admin/:id",updateProizvod)
router.post("/admin/upload-image",uploadImages);
router.delete("/admin/image/:path/:id",deleteImages);


module.exports = router
