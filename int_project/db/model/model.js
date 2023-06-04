const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const dotenv=require("dotenv");

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
dotenv.config({path:'./config.env'})
const Manufactured=new Schema({
    _id:String,
    name:{
        type:String,
    },
   
    address:{
        type:String,
        // required:false,
        
    },
    contact:{
     type:Number,
    //  required:true,
    },
    type:{
       type:String,
    //    required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    password:{
        type:String,
        // required:true,
    },
    tokens:[
        {
            token:{
                type:String,
                // required:true,
            }
        }
    ]

})
const Transporter=new Schema({
    _id:String,
    name:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    contact:{
     type:Number,
     required:true,
    },
    type:{
       type:String,
       required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

})
// user is always capital
//this functuim is before save
// Manufactured.pre('save',function(next){
//     if(this.isModified('password')){
//         this.password=bcrypt.hash(this.password,12);
//     }
//     next();
// })
//generate auth token;
Manufactured.methods.generateToken=async function(){
          try{
           
            const token=jwt.sign(({email:this.email},process.env.SECRET_KEY))
              this.Tokens=this.tokens.concat({token:token});
              thisc.save();
              return token;
        }catch(e){
            console.log(e);
          }
}
const Manufact=mongoose.model('Manufacture',Manufactured);
const Trans=mongoose.model('Transport',Transporter);
module.exports={Manufact,Trans};
