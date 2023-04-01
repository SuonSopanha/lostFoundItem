const bodyParser = require('body-parser');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');

const fs = require('fs');

//import lostitem model
const LostItem = require('../models/LostItems');
//import founditem model
const FoundItem = require('../models/FoundItems');   
const { extname } = require('path');


let searchdata;

//Get Hompage
exports.HomePage = (req,res)=>{
    res.render('HomePage',{title : 'Home Page'});
}
//Get FoundItem
exports.FoundItem = async (req,res)=>{
    //get data from foundItem
    try
    {
        const limitNumber = 4;
        const page = req.query.page || 1;
        const skip = (page - 1) * limitNumber;
        const count = await FoundItem.countDocuments({});
        const found_item = await FoundItem.find().sort({_id:-1}).skip(skip).limit(limitNumber);
        res.render('FoundItem',{data:found_item ,title : 'Found Item',page,limit : limitNumber,count});
    }
    catch(err)
    {
        res.send(err);
    }
    
}
//Get LostItem
exports.LostItem = async (req,res)=>{
    //get data from lostItem
    
    try
    {
        const limitNumber = 4;
        const page = req.query.page || 1;
        const skip = (page - 1) * limitNumber;
        const count = await FoundItem.countDocuments({});
        const lost_item = await LostItem.find().sort({_id:-1}).skip(skip).limit(limitNumber);
        res.render('LostItem',{data:lost_item,title : 'Lost Item',page,limit : limitNumber,count});
    }
    catch(err)
    {
        res.send(err);
    }
    
}

//Get Form
exports.FormLost = (req,res)=>{
    res.render('FormLost',{title : 'Form'});
}

exports.FormFound = (req,res)=>{
    res.render('FormFound',{title : 'Form'});
}

//Post LostItem
exports.PostLostItem = async (req,res)=>{
    const file = req.file;
    const fileName = path.basename(file.originalname,extname(file.originalname));
    //resize file
    sharp(file.path)
    .resize(300,300)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile('public/upload/'+fileName + '.jpeg');


    
    //send data of lostitem to database
    const lostitem = new LostItem({
        itemName: req.body.itemname,
        category: req.body.category,
        color: req.body.color,
        secondaryColor: req.body.secondarycolor,
        size: req.body.size,
        description: req.body.description,
        lostLocation: req.body.location,
        lostDate: req.body.lostdate,
        lostTime: req.body.losttime,
        image: fileName + '.jpeg',
        ownerName: req.body.username,
        ownerEmail: req.body.email,
        ownerPhone: req.body.phonenumber
    });
    lostitem.save();
    res.redirect('/lostitem');
    
};


//Post FoundItem
exports.PostFoundItem = async (req,res)=>{
    const file = req.file;
    const fileName = path.basename(file.originalname,extname(file.originalname));
    //resize file
    sharp(file.path)
    .resize(300,300)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile('public/upload/'+fileName + '.jpeg');

    //send data of lostitem to database
    const founditem = new FoundItem({
        itemName: req.body.itemname,
        category: req.body.category,
        color: req.body.color,
        secondaryColor: req.body.secondarycolor,
        size: req.body.size,
        description: req.body.description,
        foundLocation: req.body.location,
        foundDate: req.body.founddate,
        foundTime: req.body.foundtime,
        image: fileName + '.jpeg',
        founderName: req.body.username,
        founderEmail: req.body.email,
        founderPhone: req.body.phonenumber
    });
    founditem.save();
    res.redirect('/founditem');
    
}


//get LostItemDetail

exports.LostItemDetail = async (req,res)=>{
    const id = req.params.id;
    try
    {
        const lost_item = await LostItem.findById(id);
        res.render('LostItemDetail',{data:lost_item,title : 'Lost Item Detail'});
    }
    catch(err)
    {
        res.send(err);
    }
}

//get FoundItemDetail
exports.FoundItemDetail = async (req,res)=>{
    const id = req.params.id;
    try
    {
        const found_item = await FoundItem.findById(id);
        res.render('FoundItemDetail',{data : found_item,title : 'Found Item Detail'});
    }
    catch(err)
    {
        res.send(err);
    }
}

//post SearchFoundItem
exports.SearchFoundItem = async (req,res)=>{
    const search = req.body.search;
    try
    {
        const found_item = await FoundItem.find({itemName : {$regex : search,$options : 'i'}});
        res.render('FoundItemSearch',{data : found_item,title : 'Found Item'});
    }
    catch(err)
    {
        res.send(err);
    }
}

//post SearchLostItem
exports.SearchLostItem = async (req,res)=>{
    const search = req.body.search;
    try
    {
        const lost_item = await LostItem.find({itemName : {$regex : search,$options : 'i'}});
        searchdata = lost_item;
        console.log(searchdata);
        res.render('LostItemSearch',{data : lost_item,title : 'Lost Item'});

    }
    catch(err)
    {
        res.send(err);
    }
}

exports.About = (req, res) => {

    res.render('AboutUs',{title : 'About Us'});
}