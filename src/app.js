const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handlebars view engine and location of the views
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Raze"
    })
})


app.get("/weather", (req, res)=> {
    if(!req.query.address) {
        return  res.send({
              error: "You must provide a valid address"
          })
        }
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
              return res.send({
                  error: error
              })
            }

             forecast(latitude, longitude, (error, forecastData) => {
               if(error) {
                 return  res.send({
                     error: error
                 })
               }
             res.send({
                 location: location,
                 forecast: forecastData,
                 address: req.query.address
             })   
           })
           
           })
           
})

app.get("/about", (req, res)=> {
    res.render("about", {
        title: "About me",
        name: "Raze"
    })
})

app.get("/products", (req, res)=> {
    if(!req.query.search) {
    return  res.send({
          error: "You must provide a search term"
      })
    }
   console.log("this is it", req.query.search)
    res.send({
        products: []
    })
})

app.get("/help", (req, res)=> {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        name: "Raze"
    })
})
app.get("/help/*", (req, res) => {
   res.render("404", {
       errorMsg: "Help article not found.",
       name: "Raze",
       title: "404"
   })
})
app.get("*", (req, res) => {
   res.render("404", {
       errorMsg : "Page not found.",
       name: "Raze",
       title: "404"
   })
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})