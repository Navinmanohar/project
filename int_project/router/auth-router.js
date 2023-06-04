const express = require("express");
const register=express.Router();
const login=express.Router();
const router=express.Router();
const update=express.Router();
const deleteAccount=express.Router();
const authenticate=require('../middleware/auth.user')

//for transporter
const Tlogin=express.Router();
const Tregister=express.Router();
const Tupdate=express.Router();
const TdeleteAccount=express.Router();
const bodyParser=require('body-parser')

const {registerUser,loginUser,updateUser,deleteUser}=require("../userControl/manufacture-control.js")
const {TransRegisterUser,TransLoginUser,TransUpdateUser,TransDeleteUser}=require("../userControl/transport-control.js")


register.post("/register",registerUser)
login.post("/login",loginUser)
update.post("/login/update",updateUser)
deleteAccount.post("/login/delete",deleteUser)
router.get("/product",authenticate,(req,res)=>{
  res.send(req.rootUser);
})
// logut
router.get("/Logout",authenticate,(req,res)=>{
  console.log("logout page");
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send('logout');


})
// router.get("/",authenticate,(req,res)=>{
//   console.log("logout page");
//   res.clearCookie('jwtoken',{path:'/'})
//   res.status(200).send('logout');


// })


//this is for transporgter
Tregister.post("/register",TransRegisterUser)
Tlogin.post("/login",TransLoginUser)
Tupdate.post("/login/update",TransUpdateUser)
TdeleteAccount.post("/login/delete",TransDeleteUser)
//this for exporting our router


module.exports ={ register,login,update,deleteAccount,Tregister,Tlogin,Tupdate,TdeleteAccount};
