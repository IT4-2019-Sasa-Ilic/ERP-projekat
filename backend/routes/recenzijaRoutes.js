const express = require('express')
const router = express.Router()
const {getRecenzije, getRecenzijaById, createRecenzija, updateRecenzija, deleteRecenzija, getRecenzijaByProizvod, getRecenzijaByKorisnik} = require("../controllers/recenzijaController")
const {checkIfUserIsLoggedIn, checkIfUserIsAdmin} = require("../middleware/authentication")

//neulogovani korisnik
router.get('/product/:id',getRecenzijaByProizvod)

//ulogovani korisnik
router.use(checkIfUserIsLoggedIn)
router.post('/product/:id', createRecenzija)
router.put('/:id',updateRecenzija)

//admin
router.use(checkIfUserIsAdmin)
router.get('/',getRecenzije)
router.get('/:id',getRecenzijaById)
router.get('/user/:id',getRecenzijaByKorisnik)
router.delete('/:id',deleteRecenzija)

module.exports = router
