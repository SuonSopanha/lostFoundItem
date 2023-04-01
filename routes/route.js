const express = require('express');
const path = require('path');
const router = express.Router();


const controller = require('../controllers/controller');
const multer = require('multer');
const sharp = require('sharp');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/upload');
    },
    filename: (req, file, cb) =>  {
      cb(null,file.originalname);
    }
  });
const upload = multer({ storage: storage });

router.get('/',controller.HomePage);
router.get('/founditem',controller.FoundItem);
router.get('/lostitem',controller.LostItem);
router.get('/formlost',controller.FormLost);
router.get('/formfound',controller.FormFound);
router.post('/lostitem',upload.single('image'),controller.PostLostItem);
router.post('/founditem',upload.single('image') ,controller.PostFoundItem);
router.get('/lost/:id',controller.LostItemDetail);
router.get('/found/:id',controller.FoundItemDetail);
router.post('/searchfound',controller.SearchFoundItem);
router.post('/searchlost',controller.SearchLostItem);
router.get('/aboutus',controller.About);

module.exports = router;

