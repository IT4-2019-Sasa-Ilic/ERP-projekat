const mongoose = require("mongoose")
const Korisnik = require("./KorisnikModel")
const Proizvod = require("./ProizvodModel")


const recenzijaSchema = mongoose.Schema({
    opis_recenzije: {type: String, required: true},
    ocena: {type: Number, required: true},
    korisnik: {
        _id: {type: mongoose.Schema.Types.ObjectId,ref: Korisnik, required: true},
        ime: {type: String, required: true}
    },
    datum: {type:Date, default:Date.now},
    proizvod_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Proizvod,
    },
})

const Recenzija = mongoose.model("Recenzija", recenzijaSchema)
module.exports = Recenzija