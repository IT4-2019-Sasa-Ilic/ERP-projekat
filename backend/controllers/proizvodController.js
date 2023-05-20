const Proizvod = require("../models/ProizvodModel")
const Kategorija = require("../models/KategorijaModel")
const productsPerPage = 3
const imageValidation = require("../utils/imageValidation")

const getProizvodi = async (req, res,next) => {
    try {
        let filter = {}
        let filter_cena = {}
        let filter_rejting = {}
        let filter_kategorije = {}
        let text_filter = {}
        if(req.query.cena) {
            filter_cena = {cena:{$lte:Number(req.query.cena)}}
            console.log(filter_cena)
        }
        if(req.query.rejting) {
            var a = req.query.rejting.split(",");
            var ocene = a.map(function (x) { 
                return Number(x); 
              });
            filter_rejting = { prosecna_ocena:{$in:ocene}}
            console.log(filter_rejting)
        }
        if(req.query.kategorije) {
            filter_kategorije = { 
                "kategorija.naziv_kategorije":{$in:req.query.kategorije.split(",")}}
        }

        
        if (req.query.searchQuery) {
          const query = req.query.searchQuery;
          text_filter = { $text: { $search: req.query.searchQuery } };
      } 

        filter = {
            $and: [filter_rejting,filter_cena,text_filter],
          };

        const pageNumber = Number(req.query.pageNumber) || 1;
        let count = await Proizvod.countDocuments(filter);
        const totalPages = Math.ceil(count/productsPerPage);
        let sort = {"naziv_proizvoda":1}
        const how_to_sort = req.query.sort || "";

        if(how_to_sort!="") {
            let options = how_to_sort.split(" ")
            sort = {[options[0]] : Number(options[1])}
        }

        const proizvodiForCount= await Proizvod.aggregate([
            {
              $match: filter
            },
            {
              $lookup : {
                from: Kategorija.collection.name, 
                localField: 'kategorija_id',
                foreignField: '_id', 
                as: 'kategorija'
              }
            },
            {
              $unwind :{
                path: '$kategorija',
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $match : filter_kategorije
            },
        {
            $sort:sort
        }, 
        {
          $count: "total"
        }

          ])
          const proizvodi = await Proizvod.aggregate([
            {
              $match: filter
            },
            {
              $lookup : {
                from: Kategorija.collection.name, 
                localField: 'kategorija_id',
                foreignField: '_id', 
                as: 'kategorija'
              }
            },
            {
              $unwind :{
                path: '$kategorija',
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $match : filter_kategorije
            },
        {
            $sort:sort
        },

          ]).skip(pageNumber > 1 ? ((pageNumber - 1) * productsPerPage) : 0).limit(productsPerPage)
          let length = proizvodiForCount[0].total
        return res.status(200).json({proizvodi,pageNumber,totalPages,length})

    }
    catch(error) {
        next(error)
    }
}
const getProzvodById = async (req, res, next) => {
  try {
    const proizvod = await Proizvod.findById(req.params.id)
    if(!proizvod){
        return res.status(404).send("Traženi proizvod nije pronađen!")
    }
    else {
        return res.status(200).json(proizvod)
    }
  } catch (err) {
    next(err);
  }
}
const getProizvodiByKategorija = async (req, res,next) => {
    try{
        const pageNumber = Number(req.query.pageNumber) || 1;
        const naziv_kategorije = req.params.category;
        filter = {naziv_kategorije: {$eq: naziv_kategorije}}
        const proizvodi = await Proizvod.find({}).skip(pageNumber > 1 ? ((pageNumber - 1) * productsPerPage) : 0).limit(productsPerPage)
        .populate({ path: 'kategorija_id', select: 'naziv_kategorije', match: filter})
        .then((proizvod)=>proizvod.filter((proizvod=>proizvod.kategorija_id !=null)));

        const count = proizvodi.length;
        const totalPages = count > 0? Math.ceil(count/productsPerPage):1;

        return res.status(200).json({proizvodi,pageNumber,totalPages})
    }
    catch(error) {
        next(error)
    }
}

const getProizvodiAdmin = async (req, res, next) => {
  try {
    const proizvodi = await Proizvod.find({})
      .sort({ naziv_proizvoda: "asc" })
      .select("_id naziv_proizvoda cena");

    return res.status(200).json(proizvodi)
    } catch (err) {
    next(err);
  }
}

//admin
const createProizvod= async (req, res, next) => {

  try {
    const {id, naziv_proizvoda, opis_proizvoda, kolicina, cena, naziv_kategorije} = req.body;
    if(!naziv_proizvoda||!opis_proizvoda||!cena||!kolicina||!naziv_kategorije) {
      return res.status(400).send("Obavezno je popuniti sva polja!")
    }
    var kategorija = await Kategorija.findOne({naziv_kategorije: naziv_kategorije}).select('_id');
    const proizovdExists = await Proizvod.findOne({naziv_proizvoda: naziv_proizvoda})
    if(proizovdExists) {
      return res.status(409).send("Proizvod već postoji!")
    } else {
        const proizvodCreated = await Proizvod.create({
          _id:id,
          naziv_proizvoda: naziv_proizvoda,
          opis_proizvoda:opis_proizvoda,
          cena:cena,
          kolicina:kolicina,
          kategorija_id:kategorija._id
        })
        return res.status(201).send(proizvodCreated)
    }
  }catch (err) {
    next(err);
  }
}
const updateProizvod= async (req, res, next) => {
  try {
    console.log(req.params.id)
    const proizvod = await Proizvod.findById(req.params.id);
    if(!proizvod){
      return res.status(404).send("Proizvod koji se želi izmeniti ne postoji!")
    } else { 
      const { naziv_proizvoda, opis_proizvoda, kolicina, cena, naziv_kategorije} = req.body;

      if(naziv_kategorije) {
        var kategorija = await Kategorija.findOne({naziv_kategorije: naziv_kategorije}).select('_id');
      }
 
      proizvod.naziv_proizvoda = naziv_proizvoda || proizvod.naziv_proizvoda;
      proizvod.opis_proizvoda = opis_proizvoda || proizvod.opis_proizvoda;
      proizvod.cena = cena || proizvod.cena;
      proizvod.kolicina = kolicina || proizvod.kolicina;
      proizvod.kategorija_id = kategorija._id||proizvod.kategorija_id
      console.log(proizvod)
      await proizvod.save();
      return res.status(200).send("Proizvod je uspešno izmenjen!")  
    }

  } catch (err) {
    next(err);
  }
}

//admin
const deleteProizvod = async (req, res, next) => {
  try {
    const proizvod = await Proizvod.findById(req.params.id)
    console.log(req.params.id)
    if(!proizvod){
      return res.status(404).send("Proizvod koji se želi obrisati ne postoji!")
    } else {
      await proizvod.remove();
      return res.status(200).send("Proizvod je uspešno obrisan!")  
    }
  } catch (err) {
    next(err);
  }
}
const uploadImages = async (req, res, next) => {
  try {
      const validate = imageValidation(req.files.images)
      if(validate.error) {
          return res.status(400).send(validate.error)
      }

      var path = require('path');
      const images_folder_path = path.resolve(
        __dirname,
        "../../frontend",
        "public",
        "images",
        "products"
      );

      console.log(images_folder_path)

      let proizvod = await Proizvod.findById(req.query.id).orFail();


      let images = []
      if (Array.isArray(req.files.images)) {
        images = req.files.images
      } else {
        images.push(req.files.images)
      }
      for(let image of images) {
        var uploadPath = images_folder_path + "/" + image.name
        image.mv(uploadPath, function(err) {
            if(err) {
                return res.status(500).send(err)
            }
        })
        proizvod.slike.push({ url:  "/images/products/" + image.name})
    }
    await proizvod.save()
    return res.status(200).send("Slike su uspesno uploadovane!")
  } catch(err) {
      next(err)
  }
}
const deleteImages = async (req, res, next) => {
  try {
    const path = require("path");
    const imagePath = decodeURIComponent(req.params.path);
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Proizvod.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { slike: { url: imagePath } } }
    ).orFail();
    return res.status(200).send("Uspesno obrisano!");
  } catch (err) {
    next(err);
  }
};

const getBestSellers = async (req, res, next) => {
  try {
    const proizvodi = await Proizvod.aggregate([
      { $match: { broj_prodaja: { $gt: 0 } } },
      { $limit: 5 },
      { $sort: {broj_prodaja: -1 } },
      { $project: {naziv_proizvoda: 1, slike: 1, opis_proizvoda: 1,cena:1,broj_prodaja: -1  } }
    ]);
    return res.status(200).json(proizvodi)
  } catch (err) {
    next(err);
  }
}

module.exports = {getProizvodi,getProzvodById,getProizvodiByKategorija,getProizvodiAdmin,createProizvod,updateProizvod,deleteProizvod,uploadImages,deleteImages,getBestSellers}
