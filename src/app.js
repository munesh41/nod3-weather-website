const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs =require('hbs')

console.log(__dirname) 
console.log(path.join(__dirname,'../public'))
const app = express()
//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//statice directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Munesh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us ',
        name:'Munesh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
     message:'We got your back',
     title:'help',  
     name:'Munesh' 
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must add an Address'
        })
        
    }
    myLocation=req.query.address
    geocode(myLocation,(error,{latitude,longitude,location} = {})=>{
        if (error){
            
            return console.log(error)
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                address:req.query.address,
                weather:forecastData,location
            })
          })
    })

})
//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Munesh',
        error:'Help article is not found'
    })
    })
app.get('*',(req,res)=>{
res.render('404page',{
    title:'404',
    error:'Page not found',
    name:'Munesh'
})
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})