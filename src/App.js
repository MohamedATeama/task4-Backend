const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');

const viewDir = path.join(__dirname, "../templates/views")
app.set("views", viewDir)

const hbs = require("hbs")
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(publicDirectory, 'data.html'))
// })

app.get('/', (req, res) => {
    res.render('index', {
        title : "Welcome to our website. To know your country's weather, longitude and latitude, please enter the name of your country"
    })
})

const forecast = require('./data/forcast')
const geocode = require('./data/geocode')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.longtitude,data.latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : req.query.address,
                latitude : data.latitude,
                longtitude : data.longtitude
            })
        })
    })
})

app.get('*', (req, res) => {
    res.send("404 Page Not Found")
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})