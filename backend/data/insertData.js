require("dotenv").config();
const connectDB = require("../config/databaseConnection")
connectDB()

const kategorijaData = require("./kategorijaData")
const korisnikData = require("./korisnikData")
const recenzijaData = require("./recenzijaData")
const proizvodData = require("./proizvodData")
const porudzbinaData = require("./porudzbinaData")
const Kategorija = require("../models/KategorijaModel")
const Korisnik = require("../models/KorisnikModel")
const Recenzija = require("../models/RecenzijaModel")
const Proizvod = require("../models/ProizvodModel")
const Porudzbina = require("../models/PorudzbinaModel")
const insertData = async () => {
   
    try {
        await Kategorija.collection.deleteMany({})
        await Korisnik.collection.deleteMany({})
        await Recenzija.collection.deleteMany({})
        await Proizvod.collection.deleteMany({})
        await Porudzbina.collection.deleteMany({})
        await Kategorija.insertMany(kategorijaData)
        await Korisnik.insertMany(korisnikData)
        await Recenzija.insertMany(recenzijaData)    
        await Proizvod.insertMany(proizvodData)
        await Porudzbina.insertMany(porudzbinaData)
        process.exit()
    } catch (error) {
        console.error("Greska pri upisivanju podataka u bazu", error)
        process.exit(1);
    }
}

insertData()
 
