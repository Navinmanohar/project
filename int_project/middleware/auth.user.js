
const jwt=require("jsonwebtoken");
const User=require("../db/model/model")
    const authenticate=async(req,res,next)=>{
  try{
    const token=req.cookies.jwtoken;
    const verifyToken=jwt.verify(token,process.env.SECRET_key);
      const rootUser=await User.findOne(({email:verifyToken.email,"tokenstoken":token}));
  
      req.token=token;
      req.rootUser=rootUser;
      req.email=rootUser.email;
  
          next();
  }
  catch(err){
    res.status(401).sens("Unautherized user");
    console.log(err);
  }
}
module.exports=authenticate;