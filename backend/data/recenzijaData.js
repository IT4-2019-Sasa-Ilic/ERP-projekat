const ObjectId = require("mongodb").ObjectId

const recenzije = [
    {
    opis_recenzije: "Proizvod je odlican.",
    ocena: 5,
    korisnik: { _id: ObjectId('6408e03eeb5b8743713c07b3'), ime: "Saša Ilić" },
    proizvod_id: ObjectId('6410a2c06ea2059c2833289e'),

  },
  {
    opis_recenzije: "Proizvod je veoma dobar",
    ocena: 4,
    korisnik: { _id: ObjectId('6408e03eeb5b8743713c07b3'), ime: "Saša Ilić" },
    proizvod_id: ObjectId('6410a2c06ea2059c2833289e'),
  },
  {
    opis_recenzije: "Proizvod je dobar,sve preporuke",
    ocena: 3,
    korisnik: { _id: ObjectId('6408e03eeb5b8743713c07b3'), ime: "Saša Ilić" },
    proizvod_id: ObjectId('6410a2c06ea2059c2833289f'),
  },
  {
    opis_recenzije: "Proizvod je ispod ocekivanja.",
    ocena: 2,
    korisnik: { _id: ObjectId('6408e03eeb5b8743713c07b3'), ime: "Saša Ilić" },
    proizvod_id: ObjectId('6410a2c06ea2059c283328a0'),
  },
  {
    opis_recenzije: "Proizvod je veoma los,ne preporucujem.",
    ocena: 1,
    korisnik: { _id: ObjectId('6408e03eeb5b8743713c07b3'), ime: "Saša Ilić" },
    proizvod_id: ObjectId('6410a2c06ea2059c283328a1'),
  },
  {
    opis_recenzije: "Proizvod odlican.",
    ocena: 5,
    korisnik: { _id: ObjectId('6408e03eeb5b8743713c07b3'), ime: "Saša Ilić" },
    proizvod_id: ObjectId('6410a2c06ea2059c283328a2'),
  },
]

module.exports = recenzije