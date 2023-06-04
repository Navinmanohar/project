const Message = require('../model/fetchModel');
const Transporter = require('../model/transporterModel');
const nodemailer=require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/loginModel');

 const register=async  (req, res,next)=> {
  try {
    const { email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
  const registers=  await user.save();

    res.status(201).json({success:true,data:[registers], message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const login=async(req, res,next) =>{
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}




// Utility function to generate an alphanumeric Order ID
const generateOrderId = () => {
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let orderId = '';
  for (let i = 0; i < 4; i++) {
    orderId += alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
  }
  return orderId;
};




const submitMessage = async (req, res) => {
  try {
    const { to, from, quantity, transporter, address } = req.body;

    // Generate a unique alphanumeric Order ID dynamically
    const orderId = generateOrderId();

    const transporterUser = await User.findOne({ email: transporter, role: 'transporter' });
    if (!transporterUser) {
      return res.status(404).json({ message: 'Transporter not found' });
    }

    // Create a new message
    const message = new Message({
      orderId,
      to,
      from,
      quantity,
      address,
      transporter: transporterUser._id,
    });

    // Save the message to the database
    const options=  await message.save();

    const transporters = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with the correct hostname
      port: 587,
      auth: {
        user: 'parvaniaakash87@gmail.com',
        pass: 'gsyrhbbcgsslntgo',
      },
    });
    

    // Send an email to the transporter
    const transporterEmail = transporterUser.email;
    const manufacturerEmail = from;
    const mailOptions = {
      from: manufacturerEmail,
      to: transporterEmail,
      subject: 'New Message from Manufacturer',
      text: 'You have received a new message from the manufacturer. Please check your dashboard.',
    };

    // Send the email
 await transporters.sendMail(mailOptions);

    res.status(201).json({success:true,data:[options], message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ...


// Controller to get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the messages.' });
  }
};

// Controller to search messages by orderId, to, or from
const searchMessages = async (req, res) => {
  try {
    const { query } = req.query;

    const messages = await Message.find({
      $or: [
        { orderId: query },
        { to: query },
        { from: query },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while searching for messages.' });
  }
};



// Controller to retrieve all order IDs received from the Manufacturer
const getOrderIds = async (req, res) => {
  try {
    const orderIds = await Message.distinct('orderId');
    res.status(200).json(orderIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the order IDs.' });
  }
};

// Controller to handle the message reply
const replyMessage = async (req, res) => {
  try {
    const { orderId, price } = req.body;

    // Create a new reply message
    const reply = new Transporter({
      orderId,
      price,
    });

    // Save the reply to the database
    await reply.save();

    // Update the existing message with the reply information
    const updatedMessage = await Message.findOneAndUpdate(
      { orderId },
      { transporterReply: { orderId, price } },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedMessage, message: 'Reply sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the reply.' });
  }
};





  

module.exports = {register,login, submitMessage, getAllMessages, searchMessages,getOrderIds,replyMessage };

