const express = require('express');
const router = express.Router();

const { submitMessage, getAllMessages, searchMessages,getOrderIds,replyMessage,login,register } = require('../controller/fetchController');

//Route for Registration
router.post('/register', register);

//Route for Login
router.post('/login', login);

// Route for submitting a message
router.post('/submit', submitMessage);

// Route for getting all messages
router.get('/messages', getAllMessages);

// Route for searching messages by orderId, to, or from
router.get('/search', searchMessages);


router.get("/getId",getOrderIds);


router.post('/reply',replyMessage);


module.exports = router;

