const jwt = require("jsonwebtoken")

const checkIfUserIsLoggedIn = (req, res, next) => {
    try {
        const authorization = (req.headers.authorization || req.headers.Authorization)
        let token;
        if(authorization.split(" ")[1]) {
            token = authorization.split(" ")[1]
        } else 
        {
            return res.status(403).json({message:"Morate biti ulogovani da bi ste pristupili ovom resursu!"})
        }

        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
           req.user = decoded
            next()
        } catch (err) {
          return res.status(401).json({message:"Neispravan token! Pokusajte ponovo!"})  
        }

    } catch(err) {
        next(err)
    }
}
const checkIfUserIsAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(403).json({message:"Samo korisnik sa ulogom admina moze pristupiti ovom resursu"})
    }
}

module.exports = { checkIfUserIsLoggedIn,checkIfUserIsAdmin }
