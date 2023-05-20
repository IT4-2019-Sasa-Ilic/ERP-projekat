const express = require('express')
const fileUpload = require('express-fileupload')
const cookieParser = require("cookie-parser")
const app = express()
const port = 5000

app.use(express.json())
app.use(fileUpload())
app.use(cookieParser())

const apiRoutes = require("./routes")


const connectDB = require("./config/databaseConnection")
connectDB();

app.use('/api', apiRoutes)

app.use((error, req, res, next) => {
    console.error(error);
    next(error)
})
app.use((error, req, res, next) => {
    if(error.message.includes("Korisnik validation failed")) {
        return res.status(400).json({
            message: error.message.substring(28),
            stack: error.stack
          }) }
          else if(error.message.includes("E11000 duplicate key")) {
            return res.status(400).json({
              message: "Već postoji korisnik sa datim brojem telefona!",
              stack: error.stack
            }) }
          
    else {
        return res.status(500).json({
        message: error.message,
        stack: error.stack
      }) }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
