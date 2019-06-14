const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and locations
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))


app.get("/about", (req, res) => {
    res.render("about", {
        title: "about me",
        name: "Huso"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help",
        message: "Huso-Hilfe"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
            
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.address
            })
        })
    }) 
})

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Hank"
    })

})

app.get("/products", (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {msg:"Nein, nein, help article not found"})
})

app.get("*", (req, res) => {
    res.render("404", {msg:"Nein, nein, Page not found!"})
})

app.listen(port, () => {
    console.log("serv started")
})