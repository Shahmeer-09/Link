const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/Verifyjwt');
const { getAllChats } = require('../controllers/Chatcontroller');
 
router.get('/allchats', verifyJWT,getAllChats)

module.exports = router;