const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/found',express.static('public'));
app.use('/lost',express.static('public'));


app.use(expressLayouts);
app.set('layout','./layouts/main');

app.set('view engine','ejs');

//connect to mongodb database
mongoose.connect('mongodb+srv://jugram:SUSxRUPVjtytfhxi@cluster0.wykrycl.mongodb.net/lost_found?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('connected to database');
})
.catch((err)=>{
    console.log(err);
})  
app.use('/',routes);


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));