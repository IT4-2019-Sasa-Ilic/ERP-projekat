const Kategorija = require("../models/KategorijaModel");

const getKategorije = async (req, res,next) => {
    try {
        const kategorije = await Kategorija.find({}).orFail();
        return res.status(200).json(kategorije)
    }
    catch(error) {
        next(error)
    }
}
const getKategorijaById= async (req, res,next) => {
    try {
        const kategorija = await Kategorija.findById(req.params.id)
        if(!kategorija){
            return res.status(404).send("Tražena katerogija nije pronađena!")
        }
        else {
            return res.status(200).json(kategorija)
        }
}
    catch(error) {
        next(error)
    }
}
const createKategorija = async (req, res,next) => { 
    try {
        const {naziv_kategorije,opis_kategorije} = req.body;
        if(!naziv_kategorije) {
            return res.status(400).send("Obavezno je popuniti polja za naziv i opis kategorije!")
        }
        const kategorijaExists = await Kategorija.findOne({naziv_kategorije: naziv_kategorije})
        if(kategorijaExists) {
            return res.status(409).json({message:"Kategorija već postoji!"})
        } else {
            const kategorijaCreated = await Kategorija.create({
                naziv_kategorije: naziv_kategorije,
                opis_kategorije:opis_kategorije
            })
            return res.status(201).send(kategorijaCreated)
        }
    }
    catch(error) {
        next(error)
    }
}
const updateKategorija = async(req,res,next)  => {
    try {
        const kategorija = await Kategorija.findById(req.params.id);
        if(!kategorija){
          return res.status(404).send("Kategorija koji se želi izmeniti ne postoji!")
        } else {
            const { naziv_kategorije, opis_kategorije} = req.body;
            kategorija.naziv_kategorije = naziv_kategorije || kategorija.naziv_kategorije;
            kategorija.opis_kategorije = opis_kategorije || kategorija.opis_kategorije;
                     
            await kategorija.save();
            return res.status(200).send("Kategorija je uspešno izmenjena!")      
        }  
      } catch (err) {
        next(err);
      } 
 }
const deleteKategorija = async (req, res,next) => {
    try {
        const naziv = req.params.naziv;
        const kategorija = await Kategorija.findOne({naziv_kategorije: decodeURIComponent(naziv)})
        if(!kategorija){
            return res.status(404).send("Kategorija koja se želi obrisati ne postoji!")
        }
        else {
            await kategorija.remove()
            return res.status(200).send("Kategorija je uspešno obrisana!")
        }
}
    catch(error) {
        next(error)
    }
}

module.exports = {getKategorije,getKategorijaById,createKategorija,updateKategorija,deleteKategorija}
