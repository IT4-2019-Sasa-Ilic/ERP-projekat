const emailValidator = require('validator')
const mongoose = require("mongoose");


const korisnikSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true,
    maxLength: [20,'Ime korisnika ne sme biti duze od 20 karaktera']
  },
  prezime: {
    type: String,
    required: true,
    maxLength: [20,'Prezime korisnika ne sme biti duze od 20 karaktera']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {validator: emailValidator.isEmail,
    message: '{VALUE} je neispravna email adresa. Unesite ispravnu email adresu!',
    isAsync: false
  }
  },
  broj_telefona: {
    type: String,
    match: [/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Unesite ispavan broj telefona!']
  },
  ulica: {
    type: String,
    maxLength:[100,'Naziv ulice ne sme biti duzi od 100 karaktera']
  },
  grad: {
    type: String,
    maxLength:[50,'Naziv grada ne sme biti duzi od 50 karaktera']
  },
  drzava: {
    type: String,
    maxLength:[50,'Naziv drzave ne sme biti duzi od 50 karaktera']
  },
  ptt: {
    type: Number,
    minlength:[5,'Ptt mora imati tacno 5 cifara!'],
    maxlength: [5,'Ptt mora imati tacno 5 cifara!']
  },
  okrug: {
    type: String,
    maxLength:[70,'Naziv okruga ne sme biti duzi od 70 karaktera']
  },
  lozinka: {
    type: String,
    required: true,
    minlength:7
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  datum_kreiranja_naloga: {
    type:Date,
    default:Date.now
}
});

const Korisnik = mongoose.model("Korisnik", korisnikSchema);
module.exports = Korisnik;