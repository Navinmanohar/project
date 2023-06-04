const mongoose=require ("mongoose");

// Create the user schema
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['manufacturer', 'transporter'],
      required: true,
    },
  });
  
  // Create the user model
  const User = mongoose.model('User', userSchema);

  module.exports=User