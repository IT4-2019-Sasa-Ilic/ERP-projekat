const mongoose = require("mongoose")
const Kategorija = require("./KategorijaModel")


const proizvodSchema = mongoose.Schema({
    naziv_proizvoda: {
        type: String,
        required: true,
        unique: true,
    },
    opis_proizvoda: {
        type: String,
        required: true,
    },
    kategorija_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Kategorija,
    },
    kolicina: {
        type: Number,
        required: true,
    },
    cena: {
        type: Number,
        required: true,
    },
    prosecna_ocena: {
        type: Number,
    },
    broj_recenzija: {
        type: Number,
        default: 0
    },
    broj_prodaja: {
        type: Number,
        default: 0
    },
    slike: [
        {
        url: {type: String, required: true}
        }
    ],
    datum_objavljivanja: {
        type:Date,
        default:Date.now
    }
}
)

proizvodSchema.index({naziv_proizvoda: "text", opis_proizvoda: "text"}, {name: "TextIndex"})

const Proizvod = mongoose.model("Proizvod", proizvodSchema)
module.exports = Proizvod
