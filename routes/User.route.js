const express = require('express');
const router = express.Router();
const {registerUser, getCurrent, searchAllusers, sendRequest, declineRequest, resendReq, removereq, accepRequest} = require('../controllers/userController')
const verifyJWT = require('../middlewares/Verifyjwt')
 router.post('/register', registerUser);
 router.get('/current',verifyJWT,getCurrent);
 router.post('/searchusers',verifyJWT,searchAllusers);
 router.post('/sendreq',verifyJWT,sendRequest);
 router.post('/declinereq',verifyJWT,declineRequest);
 router.post('/resendreq',verifyJWT,resendReq);
 router.post('/removereq',verifyJWT,removereq);
 router.post('/acceptReq',verifyJWT,accepRequest)

module.exports = router;