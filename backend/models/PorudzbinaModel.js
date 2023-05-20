const mongoose = require("mongoose")
const Korisnik = require("./KorisnikModel")
const Proizvod = require("./ProizvodModel")

const porudzbinaSchema = mongoose.Schema({
    korisnik_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Korisnik,
    },
    kolicina: {
        type: Number, 
        required: false
    },
    ukupna_cena: {
        type: Number,
        required: false
    },
    stavkePorudzbine: [
        {
            proizvod_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Proizvod,
                required: true
            },
            naziv_proizvoda: {
                type: String,
                 required: true
                },
            kolicina: {
                type: Number,
                 required: true
                },
            cena: {
                type: Number,
                 required: true
                }
        }
    ],
    transakcijaInfo:{
        status_transakcije: {
            type: String
        },
        datum: {
            type:Date,
            required: false
        }
    },
    nacin_placanja: {
      type: String,
      required: true,
    },
    placeno: {
        type: Boolean,
        required: true,
        default: false,
    },
    datum_placanja: {
        type: Date,
    },
    datum_porudzbine: {
        type: Date,
        default:Date.now
    },
    status_porudzbine: {
        type: String,
        required: true,
        default: 'Nije isporučeno',
    },
    datum_isporuke: {
        type: Date,
        required: false,
    }
})

const Porudzbina = mongoose.model("Porudzbina", porudzbinaSchema)
module.exports = Porudzbina