const express = require("express");
const {Manufact} = require("../db/model/model.js");
const {v4:uuid}=require("uuid")
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken");

const registerUser=async (req, res) => {
   
  console.log(req.body);
    const {name,address,contact,type,email,password} = req.body;
    try {
    const _id=uuid();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Manufact({
            _id,
            name,
            address,
            contact,
            type,
            email,
            password:hashedPassword
              });

      const result = await user.save();
    //   Manufact.pre('save',function(next){
    //     if(this.isModified('password')){
    //         this.password=bcrypt.hash(this.password,12);
    //     }
    //     next();
    // })

      if (!result) return res.status(404).json({ message: "not created" });
      else {
        res.status(200).json({ message: "success",data:[result] });
         
        return;
      }
    } catch (err) {
      console.log(err);
    }
    res.json({ message: req.body });
  };
  const loginUser=async(req, res,next) =>{
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await Manufact.findOne({ email });
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
        { email: user.email},
        'secret_key',
        { expiresIn: '1h' }
      );
      // var now = new Date();
      // var time = now.getTime();
      // res.cookies('jwtoken',token,{
      //   httpOnly:true,
      //   expries:new Date(time+30*24*60*1000)
      // })
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  

const updateUser=async(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;
    await Manufact.findOneAndUpdate({email:email},{$set:{password:password,name:name}}).then((data)=>
    {
         data?res.status(200).json({message:`data updated ${data}`})
             :res.status(200).json({message:`data not  updated` })
           
    }).catch(e=>console.log(e))
}
const deleteUser=async(req,res)=>
{
    const email=req.body.email;
    await Manufact.deleteOne({email:email}).then(data=>{
         data?
           res.status(200).json({message:`data delete ${req.body}`})
           :res.status(200).json({message:`data not  delete` })
         
    }).catch(e=>console.log(e));
}
  module.exports={registerUser,loginUser,updateUser,deleteUser};