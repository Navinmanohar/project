const mongoose=require("mongoose")
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'})
const db=process.env.DATABASE; //these are dotenv
mongoose.set('strictQuery',false);
   mongoose.connect(db,{
    
    // userNewUrlBParser:true,
    // userCreateIndex:true,
    // useUnifieldTopology:true,
    // usefindAndModify:false
    
}).then(()=>{
    console.log(`connect`)
}).catch((err)=>{
    console.log(`not connected${err}`)
});
