const express  = require('express')
const app= express();
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const busdriver = require('./models/busdriver');
const ejsMate = require('ejs-mate');
const bus = require('./models/bus');



//MOngoose connection 
mongoose.connect('mongodb://localhost:27017/busroute', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once ("open", ()=> {
    console.log("Database connected ")
})


//Path for directory 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/',(req, res) =>{
    res.render('home')
})


//get diver name from mongo and using CRUD to update driver info 
app.get('/busdrivers', async(req,res) => {
    const busdrivers = await busdriver.find({});
    res.render('busdrivers/index', {busdrivers})
})

app.get('/busdrivers/new', (req,res)=>{
    res.render('busdrivers/new')
})

app.post('/busdrivers', async(req, res) => {
    const driver = new busdriver(req.body.driver)
    await driver.save();
    res.redirect(`/busdrivers/${driver._id}`)
})


app.get('/busdrivers/:id', async(req,res) => {
    const driver = await busdriver.findById(req.params.id)
    res.render('busdrivers/show', { driver})
})


app.get('/busdrivers/:id/edit', async(req, res)=>{
    const driver = await busdriver.findById(req.params.id)
    res.render('busdrivers/edit', { driver})
})

app.put('/busdrivers/:id', async(req, res)=>{
    const { id } = req.params;
    const driver = await busdriver.findByIdAndUpdate(id, {...req.body.driver});
    res.redirect(`/busdrivers/${driver._id}`)  
})

app.delete('/busdrivers/:id', async(req, res)=>{
    const { id } = req.params;
    await busdriver.findByIdAndDelete(id)
    res.redirect('/busdrivers')
})

// Login to connect the database unable to connect this point 

// app.get('/busdrivers/:id/buses/new', (req, res)=>{
//     const {id} = req.params;
//     res.render('buses/new', {id})
// })
// app.post('/busdrivers/:id/buses', async (req, res)=>{
//     const{id} = req.params
//     const driver = await  busdriver.findById(id)
//     const { capacity, model, make} = req.body;
//     const abus = new bus({capacity, model, make })
//     driver.bus.push(abus);
//     abus.driver = driver;
//     await driver.save();
//     await abus.save();
// })

// CRUD for BUSES 
app.get('/buses', async(req,res) => {
    const buses = await bus.find({});
    res.render('buses/index', {buses})
})

app.get('/buses/new', (req,res)=>{
    res.render('buses/new')
})

app.post('/buses', async(req, res) => {
    const abus = new bus(req.body.abus)
    await abus.save();
    res.redirect(`/buses/${abus._id}`)
})

app.get('/buses/:id', async(req,res) => {
    const abus = await bus.findById(req.params.id)
    res.render('buses/show', { abus})
})

app.get('/buses/:id/edit', async(req, res)=>{
    const abus = await bus.findById(req.params.id)
    res.render('buses/edit', { abus})
})

app.put('/buses/:id', async(req, res)=>{
    const { id } = req.params;
    const abus = await bus.findByIdAndUpdate(id, {...req.body.abus});
    res.redirect(`/buses/${abus._id}`)  
})

app.delete('/buses/:id', async(req, res)=>{
    const { id } = req.params;
    await bus.findByIdAndDelete(id)
    res.redirect('/buses')
})

app.listen(3000,() =>{
    console.log('serving on port 3000')

})