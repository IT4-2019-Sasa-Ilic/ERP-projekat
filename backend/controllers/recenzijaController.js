const Recenzija = require("../models/RecenzijaModel")
const Proizvod = require("../models/ProizvodModel")


const getRecenzije = async (req, res,next) => {
    try {
        const recenzije = await Recenzija.find({}).sort({datum:"asc"}).orFail();
        return res.status(200).json(recenzije)
    }
    catch(error) {
        next(error)
    }
}
const getRecenzijaById = async (req, res,next) => {
    try {
        const recenzija = await Recenzija.findById(req.params.id)
        if(!recenzija){
            return res.status(404).send("Tražena recenzija nije pronađena!")
        }
        else {
            return res.status(200).json(recenzija)
        }
}
    catch(error) {
        next(error)
    }
}
const getRecenzijaByProizvod = async (req, res,next) => {

    try {
        const recenzije = await Recenzija.find({proizvod_id: req.params.id})
        return res.status(200).json(recenzije)
    }catch(error) {
        next(error)
    }
}
const getRecenzijaByKorisnik = async (req, res,next) => {

    try {
        const recenzije = await Recenzija.find({"korisnik._id": req.params.id})
        return res.status(200).json(recenzije)
    }catch(error) {
        next(error)
    }
}
const createRecenzija = async (req, res, next) => {
    try {
        const { opis_recenzije, ocena } = req.body;
        if (!opis_recenzije || !ocena) {
            return res.status(400).send("Neophodno je uneti tekst recenzije i ocenu!");
        }
        const proizvod = await Proizvod.findById(req.params.id)
        if(!proizvod) {
            return res.status(404).send('Proizvod za koji se želi ostaviti recenzija ne postoji!')
        } else { 
            const alreadyReviewed = await Recenzija.findOne({"korisnik._id": req.user._id,proizvod_id: req.params.id})
            console.log(alreadyReviewed)
            if(alreadyReviewed) {
                return res.status(400).json({message:'Već ste ostavili recenziju za ovaj proizvod! Proizvod je moguce oceniti samo jednom!'})
            } else { 
                await Recenzija.create([
                    {
                        opis_recenzije: opis_recenzije,
                        ocena: Number(ocena),
                        korisnik: { _id: req.user._id, ime: req.user.ime + " " + req.user.prezime },
                        proizvod_id: req.params.id
                    }
                ])
                return res.status(201).send('Recenzija uspesno kreirana!')
            }
        }   
    } catch (err) {
        next(err)   
    }
}
const updateRecenzija = async(req,res,next)  => {
    try {
        const recenzija = await Recenzija.findById(req.params.id);
        if(!recenzija){
          return res.status(404).send("Recenzija koji se želi izmeniti ne postoji!")
        } else {
          const { opis_recenzije, ocena} = req.body;

          if(req.user._id==recenzija.korisnik._id) {
            recenzija.opis_recenzije = opis_recenzije || recenzija.opis_recenzije;
            recenzija.ocena = ocena || recenzija.ocena;
                     
            await recenzija.save();
            return res.status(200).send("Recenzija je uspešno izmenjena!") 
          } else {
            return res.status(400).send("Mozete izmeniti samo recenziju koju ste vi ostavili!")
          }
        }  
      } catch (err) {
        next(err);
      } 
 }
const deleteRecenzija = async (req, res,next) => {
    try {
        const recenzija = await Recenzija.findById(req.params.id)
        if(!recenzija){
            return res.status(404).send("Recenzija koja se želi obrisati ne postoji!")
        }
        else {
            await recenzija.remove()
            return res.status(200).send("Recenzija je uspešno obrisana!")
        }
}
    catch(error) {
        next(error)
    }
}



module.exports = {getRecenzije,getRecenzijaById,getRecenzijaByProizvod,getRecenzijaByKorisnik,createRecenzija,updateRecenzija,deleteRecenzija};