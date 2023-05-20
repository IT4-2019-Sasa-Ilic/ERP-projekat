const express = require("express")
const app = express()
const proizvodRoutes = require("./routes/proizvodRoutes")
const kategorijaRoutes = require("./routes/kategorijaRoutes")
const korisnikRoutes = require("./routes/korisnikRoutes")
const porudzbinaRoutes = require("./routes/porudzbinaRoutes")
const recenzijaRoutes = require("./routes/recenzijaRoutes")
const stripeRoutes = require("./routes/stripeRoutes")

app.use("/products", proizvodRoutes)
app.use("/categories", kategorijaRoutes)
app.use("/users", korisnikRoutes)
app.use("/orders", porudzbinaRoutes)
app.use("/reviews",recenzijaRoutes)
app.use("/stripe",stripeRoutes)

module.exports = app