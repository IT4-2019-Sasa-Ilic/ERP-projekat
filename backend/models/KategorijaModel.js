const mongoose = require("mongoose");

const kategorijaSchema = mongoose.Schema({
  naziv_kategorije: { 
    type: String, 
    required: false, 
    unique: true,
    maxLength:50 
},
  opis_kategorije: { 
    type: String, 
    default: "Opis kategorije" 
},
  slika_url: {
     type: String,
     required: false
     },
});

const Kategorija = mongoose.model("Kategorija", kategorijaSchema);
module.exports = Kategorija;