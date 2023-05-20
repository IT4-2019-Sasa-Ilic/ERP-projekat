const Korisnik = require("../models/KorisnikModel")
const bcrypt = require("bcryptjs")
const createJwtToken = require("../utils/createJwtToken");


const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const comparePasswords = (enteredPassword, hashedPassword) => {
  return bcrypt.compareSync(enteredPassword, hashedPassword)
}


const getKorisnici = async (req, res, next) => {
  try {
    const korisnici = await Korisnik.find({}).select("-lozinka")
    return res.status(200).json(korisnici)
  }
  catch (error) {
    next(error)
  }
}
//admin
const getKorisnikById = async (req, res, next) => {
  try {
    const korisnik = await Korisnik.findById(req.params.id).sort({ datum_kreiranja_naloga: "asc" })
      .select("_id ime prezime email isAdmin");
    if (!korisnik) {
      return res.status(404).send("Traženi korisnik nije pronađen!")
    }
    else {
      return res.status(200).json(korisnik)
    }
  } catch (err) {
    next(err);
  }
}
const registracija = async (req, res, next) => {
  try {
    const { ime, prezime, email, lozinka, broj_telefona, ulica, grad, drzava, ptt, okrug } = req.body;
    if (!ime || !prezime || !email || !lozinka) {
      return res.status(400).send("Neophodno je uneti obavezne podatke o sebi:ime,prezime,e-mail i lozinku!");
    }

    const userExists = await Korisnik.findOne({ email });
    if (userExists) {
      return res.status(409).json({message:"Korisnik sa unetim e-mailom već postoji!"});
    } else {
      const korisnik = await Korisnik.create({
        ime: ime,
        prezime: prezime,
        email: email.toLowerCase(),
        lozinka: hashPassword(lozinka),
        broj_telefona: broj_telefona,
        ulica: ulica,
        grad: grad,
        drzava: drzava,
        ptt: ptt,
        okrug: okrug
      });
      const token = createJwtToken(korisnik._id, korisnik.ime, korisnik.prezime, korisnik.email, korisnik.isAdmin);
      res.status(201).json({
        success: "Korisnik uspešno registrovan!",
        korisnik: { _id: korisnik._id, ime: korisnik.ime, prezime: korisnik.prezime, email: korisnik.email, isAdmin: korisnik.isAdmin,
        token: token }
      });
    }
  } catch (err) {
    next(err);
  }
}
const login = async (req, res, next) => {
  try {
    const { email, lozinka } = req.body;
    if (!email || !lozinka) {
      return res.status(400).send("Neophodno je uneti e-mail i lozinku!");
    }

    const korisnik = await Korisnik.findOne({ email });
    if (korisnik) {
      if (!comparePasswords(lozinka, korisnik.lozinka)) {
        return res.status(401).json({message:"Neispravna lozinka! Pokusajte ponovo!"})
      } else {
        const token = createJwtToken(korisnik._id, korisnik.ime, korisnik.prezime, korisnik.email, korisnik.isAdmin)
        return res.json({
            success: "Korisnik uspešno ulogovan!",
            korisnik: { _id: korisnik._id, ime: korisnik.ime, prezime: korisnik.prezime, email: korisnik.email, isAdmin: korisnik.isAdmin,
            token: token }
          });
      }
    } else {
      return res.status(401).json({message:"Ne postoji korisnik sa unetim e-mailom!"})
    }
  } catch (err) {
    next(err);
  }
}
const logout = async (req, res, next) => {
  res.cookie(
    "token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "strict"
  })


  return res.status(200).json({
    success: true,
    message: 'Korisnik uspesno izlogovan!'
  })
}
const getProfile = async (req, res, next) => {
  try {
    const korisnik = await Korisnik.findById(req.params.id)
    if (!korisnik) {
      return res.status(404).send("Traženi korisnik nije pronađen!")
    } else if(req.user._id!=korisnik._id) {
      return res.status(400).send("Smete pristupiti samo sopstvenom profilu!")
    }else {
      return res.status(200).json(korisnik)
    }
  } catch (err) {
    next(err);
  }
}
const updateProfil = async (req, res, next) => {
  try {
    const korisnik = await Korisnik.findById(req.body.id);
    if (!korisnik) {
      return res.status(404).send("Ne postoji korisnik sa datim id-jem!")
    } else {
      korisnik.ime = req.body.ime || korisnik.ime;
      korisnik.prezime = req.body.prezime || korisnik.prezime;
      korisnik.email = req.body.email || korisnik.email;
      korisnik.broj_telefona = req.body.broj_telefona || korisnik.broj_telefona;
      korisnik.ulica = req.body.ulica || korisnik.ulica;
      korisnik.grad = req.body.grad || korisnik.grad;
      korisnik.drzava = req.body.drzava || korisnik.drzava;
      korisnik.ptt = req.body.ptt || korisnik.ptt;
      korisnik.okrug = req.body.okrug || korisnik.okrug;

      if (req.body.lozinka !== korisnik.lozinka) {
        korisnik.lozinka = hashPassword(req.body.lozinka);
      }
      await korisnik.save();
      const authorization = (req.headers.authorization || req.headers.Authorization)
      let token;
      if(authorization) {
          token = authorization.split(" ")[1]
          
      }
      res.status(200).json({
        success: "Podaci o korisniku uspešno ažurirani",
        korisnik: {
          _id: korisnik._id,
          ime: korisnik.ime,
          prezime: korisnik.prezime,
          email: korisnik.email,
          isAdmin:korisnik.isAdmin,
          token:token
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

//admin
const updateKorisnikByAdmin = async (req, res, next) => {
  try {
    const korisnik = await Korisnik.findById(req.params.id)
    if (!korisnik) {
      return res.status(404).send("Traženi korisnik nije pronađen!")
    }
    else {
      korisnik.isAdmin = req.body.isAdmin;
      await korisnik.save();
      return res.status(200).send("Korisnik uspešno ažuriran!")
    }
  } catch (err) {
    next(err);
  }
}
//admin
const deleteKorisnik = async (req, res, next) => {
  try {
    const korisnik = await Korisnik.findById(req.params.id)
    if (!korisnik) {
      return res.status(404).send("Korisnik koji se želi obrisati ne postoji!")
    } 
    else {
      await korisnik.remove()
      return res.status(200).send("Korisnik je uspešno obrisan!")
    }
  }
  catch (error) {
    next(error)
  }
}
module.exports = {getKorisnici, registracija, login, logout,updateProfil, getProfile, getKorisnikById, updateKorisnikByAdmin, deleteKorisnik }
