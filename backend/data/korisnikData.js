const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;
const korisnici = [
    {
    ime: "Saša",
    prezime: "Ilić",
    email:"ilic.sasa2001@gmail.com",
    broj_telefona:09456125,
    ulica: "Pop Lukina 4",
    grad: "Šabac",
    drzava:"Srbija",
    ptt:21000,
    okrug:"Mačvanski okrug",
    lozinka: bcrypt.hashSync('lic.sasa2001@gmail.com', 10),
    isAdmin:true
  },
  {
    ime: "Marko",
    prezime: "Marković",
    email:"marko@gmail.com",
    ulica: "Bulevar Mihajla Pupina 30",
    grad: "Beograd",
    drzava:"Srbija",
    ptt:11000,
    broj_telefona:065456124,
    lozinka: bcrypt.hashSync('marko@gmail.com', 10),
  },
  {
    ime: "Petar",
    prezime: "Petrović",
    email:"pera@gmail.com",
    broj_telefona: 065456125,
    ulica: "Bulevar oslobodjenja 20",
    grad: "Novi Sad",
    drzava:"Srbija",
    ptt:21000,
    lozinka: bcrypt.hashSync('pera@gmail.com', 10),
  },
  {
    ime: "Nikola",
    prezime: "Nikolic",
    email:"nikola@gmail.com",
    broj_telefona:0945612,
    ulica: "Cara Dusana 8",
    grad: "Nis",
    drzava:"Srbija",
    ptt:18000,
    okrug:"Moravski okrug",
    lozinka: bcrypt.hashSync('nikola@gmail.com', 10),
  }
]

module.exports = korisnici