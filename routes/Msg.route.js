const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/Verifyjwt');
const { getallmessages,  sendMessage, deleMessage, deleConversation } = require('../controllers/Messagecontroller');

 
router.get('/allmsgs', verifyJWT,getallmessages)
router.post('/sendmsg', verifyJWT,sendMessage)
router.post('/delmsg', verifyJWT,deleMessage)
router.post('/delconv', verifyJWT,deleConversation)

module.exports = router;