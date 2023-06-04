const express = require("express");
const {Trans} = require("../db/model/model.js");
const {v4:uuid}=require("uuid")

const TransRegisterUser=async (req, res) => {
    console.log(req.body);
    const {name,email,password} = req.body;
    const _id=uuid();
    const user = new Trans({
            _id,
            name,
            email,
            password
    });
    try {
      const result = await user.save();
      if (!result) return res.status(404).json({ message: "not created" });
      else return res.status(200).json({ message: "success" });
    } catch (err) {
      console.log(err);
    }
    res.json({ message: req.body });
  };
  const TransLoginUser=async(req,res)=>{
    const email=req.body;
    await Trans.findOne({email:email.email}).then((data)=>
    {
         data?(data.password===req.body.password?res.status(200).json({message:`congratulation `})
         :res.status(200).json({message:`password is wrong`}))
         : res.status(400).json({message:`you have to register first`})
    }).catch((e)=>{
      console.log(e);
    })
}
const TransUpdateUser=async(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;
    await Trans.findOneAndUpdate({email:email},{$set:{password:password,name:name}}).then((data)=>
    {
         data?res.status(200).json({message:`data updated${data} `})
             :res.status(200).json({message:`data not  updated` })
           
    }).catch(e=>console.log(e))
}
const TransDeleteUser=async(req,res)=>
{
    const email=req.body.email
    await Trans.deleteOne({email:email}).then(data=>{
         data?
           res.status(200).json({message:`data deleted `})
           :res.status(200).json({message:`data not  delete` })
        
    }).catch(e=>console.log(e));
}
  module.exports={TransRegisterUser,TransLoginUser,TransUpdateUser,TransDeleteUser};