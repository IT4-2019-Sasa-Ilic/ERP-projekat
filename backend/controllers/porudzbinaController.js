const Porudzbina = require("../models/PorudzbinaModel");
const Proizvod = require("../models/ProizvodModel");
const ObjectId = require("mongodb").ObjectId;

const getPorudzbineKorisnika = async (req, res, next) => {
    try {
        const porudzbine = await Porudzbina.find({ korisnik_id: ObjectId(req.user._id)})
        .select("_id kolicina ukupna_cena status_porudzbine datum_porudzbine");

        return res.status(200).send(porudzbine);
    } catch (error) {
        next(error)
    }
}
const getPorudzbinaById = async (req, res, next) => {
    try {
       const porudzbina = await Porudzbina.findById(req.params.id).populate("stavkePorudzbine.proizvod_id","slike").populate("korisnik_id", "-lozinka -isAdmin -_id -__v -createdAt -updatedAt");
       if(!porudzbina){
        return res.status(404).send("Ne postoji porudzbina sa datim id-jem")
        } else {
            return res.status(200).json(porudzbina)
        }
    } catch (err) {
        next(err)
    }
}
//admin
const getPorudzbineAdmin = async (req, res, next) => {
    try {
        const porudzbine = await Porudzbina.find({}).populate("korisnik_id", "-lozinka -isAdmin -_id -__v  -datum_kreiranja_naloga -createdAt -updatedAt").sort({datum_porudzbine:"desc"});       
        return res.send(porudzbine);
    } catch (err) {
        next(err)
    }
}
const createPorudzbina = async (req, res, next) => { 
    try {
        console.log(req.body)
        const { stavkePorudzbine, nacin_placanja } = req.body;
        if (!stavkePorudzbine || !nacin_placanja) {
            return res.status(400).send("Neophodno je uneti stavke porudzbine i nacin placanja");
        }
        else {
            console.log(stavkePorudzbine.length)
            for(let i =0;i<stavkePorudzbine.length;i++) {
                id=stavkePorudzbine[i].proizvod_id
                const proizvod = await Proizvod.findById(id).select("kolicina");
                if(stavkePorudzbine[i].kolicina>proizvod.kolicina)
                {
                    return res.status(400).send("Nije moguće poručiti veću količinu od one koja je na stanju!");
                }
            }
            const porudzbina = await Porudzbina.create({
                stavkePorudzbine: stavkePorudzbine,
                korisnik_id: ObjectId(req.user._id),
                nacin_placanja:nacin_placanja
            }) 

            return res.status(201).send(porudzbina);
        }

    } catch (err) {
        next(err)
    }
}
//admin
const updatePorudzbinaPlacena=
    async(req, res, next,id) => {
        try {
        console.log("ID",id)
        const porudzbina = await Porudzbina.findById(id);

        if(!porudzbina){
            return res.status(404).send("Ne postoji porudzbina sa datim id-jem")
        } else {
            porudzbina.placeno = true;
            porudzbina.datum_placanja = Date.now();
            await porudzbina.save();
            //return res.status(200).send("Porudbzbina uspesno azurirana!");
        }
    } catch (err) {
        next(err);
    }

}

//admin
const updatePorudzbinaIsporucena = async (req, res, next) => {
    try {
        const porudzbina = await Porudzbina.findById(req.params.id);
        if(!porudzbina){
            return res.status(404).send("Ne postoji porudzbina sa datim id-jem")
        } else {
            porudzbina.status_porudzbine = "Isporuceno";
            porudzbina.datum_isporuke = Date.now();
            await porudzbina.save();
            return res.status(200).send("Porudbzbina uspesno azurirana!");
        }
    } catch (err) {
        next(err);
    }
}
//admin
const deletePorudzbina  = async (req, res,next) => {
    try {
        const porudzbina = await Porudzbina.findById(req.params.id)
        if(!porudzbina){
            return res.status(404).send("Porudzbina koja se želi obrisati ne postoji!")
        }
        else {
            await porudzbina.remove()
            return res.status(200).send("Porudzbina je uspešno obrisana!")
        }
}
    catch(error) {
        next(error)
    }
}

const updateIznosPorudzbine=
    async(req, res, next,id,iznos) => {
        try {
        console.log("ID",id)
        const porudzbina = await Porudzbina.findById(id);

        if(!porudzbina){
            return res.status(404).send("Ne postoji porudzbina sa datim id-jem")
        } else {
            porudzbina.ukupna_cena = porudzbina.ukupna_cena + iznos;
            await porudzbina.save();
            //return res.status(200).send("Porudbzbina uspesno azurirana!");
        }
    } catch (err) {
        next(err);
    }

}
module.exports = {getPorudzbineKorisnika,getPorudzbinaById,createPorudzbina,getPorudzbineAdmin,updatePorudzbinaPlacena,updatePorudzbinaIsporucena,deletePorudzbina,updateIznosPorudzbine}

