const express=require ("express");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const bodyParser=require('body-parser');
dotenv.config({path:'./config.env'})
const {register,login,update,deleteAccount,Tregister,Tlogin,Tupdate,TdeleteAccount}=require("./router/auth-router")



require('./db/connection');

const port=process.env.PORT;
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello user")  
})

//this is menufacture
app.use("/",register)
app.use("/",login)
app.use("/manufacture",update)
app.use("/manufacture",deleteAccount)

//this trnspoter
app.use("/transport",Tregister)
app.use("/transport",Tlogin)
app.use("/transport",Tupdate)
app.use("/transport",TdeleteAccount)



app.use(express.urlencoded({ extended: false}));



const userController=require("./router/fetchRouter");

app.use("/main/user",userController);

 


mongoose.connect(mongoURI, connectOptions).then(() => {
  console.log('MongoDB connected!');
  app.listen(3000, () => {
    console.log('Server has started!');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});




app.listen(port,()=>{
    console.log(`listening on port${port}`)
})