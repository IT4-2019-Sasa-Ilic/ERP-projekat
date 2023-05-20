const ObjectId = require("mongodb").ObjectId;
const porudzbine = [
    {
    korisnik_id: ObjectId("6408da2f2d64c0437fd0ec70"),
    stavkePorudzbine:[
      {
        proizvod_id: ObjectId('6408e03eeb5b8743713c07b3'), 
        naziv_proizvoda: "Motogrini E:MOTION L3 Električni skuter",
        porudzbina_id: ObjectId('6408e03eeb5b8743713c07b3'),
        kolicina:2,
        cena:1000
      },
      {
        proizvod_id: ObjectId('6408e03eeb5b8743713c07b3'),
        naziv_proizvoda: "MOYE Yugo Električni bicikl Tempo",
        porudzbina_id: ObjectId('6408e03eeb5b8743713c07b3'),
        kolicina:1,
        cena:3400
      }
    ],
    transakcijaInfo:{    
      status_transakcije: "Uspesna",
      datum: Date("2023-03-10T14:28:21.446+00:00")
  },
    nacin_placanja: "Stripe",
    placeno: true,
    datum_placanja:Date("2023-03-18T11:12:25.446+00:00"),
    status_porudzbine:"Isporučeno",
    datum_isporuke:Date("2023-03-20T11:12:25.446+00:00"),
  },
  {
    korisnik_id: ObjectId("6408da2f2d64c0437fd0ec70"),
    stavkePorudzbine: [
      { 
        naziv_proizvoda: "MOYE Yugo Električni bicikl Tempo", 
        proizvod_id: ObjectId('6408e03eeb5b8743713c07b3'),
        porudzbina_id: ObjectId('6408e03eeb5b8743713c07b3'),
        kolicina:4,
        cena:1000
      }
    ],
    transakcijaInfo:{    
      status_transakcije: "Na cekanju",
      datum: Date("2023-03-10T14:28:21.446+00:00")
  },
    nacin_placanja: "Placanje pouzecem",
    placeno: true,
    datum_placanja:Date("2023-03-18T11:12:25.446+00:00"),
  },
  {
    korisnik_id: ObjectId("6408da2f2d64c0437fd0ec70"),
    transakcijaInfo:{    
      status_transakcije: "Uspesna",
      datum: Date("2023-03-10T14:28:21.446+00:00")
  },
    nacin_placanja: "Stripe",
    placeno: true,
    datum_placanja:Date("2023-03-18T11:12:25.446+00:00"),
    status_porudzbine:"Isporučeno",
    datum_isporuke:Date("2023-03-20T11:12:25.446+00:00"),
  },
  {
    korisnik_id: ObjectId("6408da2f2d64c0437fd0ec70"),
    stavkePorudzbine:[
      {
        proizvod_id: ObjectId('6408e03eeb5b8743713c07b3'),
        naziv_proizvoda: "Motogrini E:MOTION L3 Električni skuter",
        porudzbina_id: ObjectId('6408e03eeb5b8743713c07b3'),
        kolicina:5,
        cena:5500
      }
    ],
    transakcijaInfo:{    
      status_transakcije: "Odbijena",
      datum: Date("2023-03-9T14:11:21.446+00:00"),
  },
    nacin_placanja: "Placanje pouzecem",
    datum_placanja:Date("2023-03-18T11:12:25.446+00:00"),
  },
]

module.exports = porudzbine