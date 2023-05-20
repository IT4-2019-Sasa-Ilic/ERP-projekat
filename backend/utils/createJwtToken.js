const jwt = require("jsonwebtoken");

const createJwtToken = (_id, ime, prezime, email, isAdmin) => {
  return jwt.sign(
    { _id, ime, prezime, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};
module.exports = createJwtToken
