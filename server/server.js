//write npm init to initialize my project(1)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authrouter = require("./routes/auth_routes");
const contactRouter=require("./routes/contact_routes")
const connetDb = require("./utils/db");
const errorMiddleware = require("./middleware/error_middleware");



const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));//for fetch the data from frontend(React.js)
app.use(express.json())



// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authrouter);
app.use("/api/form",contactRouter);

app.use(errorMiddleware);


const PORT = 5000;
connetDb().then(()=>{
    
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});

});



// app.get("/",(req,res)=>{
//     res.status(200).send("request send 200 and app is listening by server and request response")
// })
// app.get("/register",(req,res)=>{
//     res.status(200).send("request send 200 and you are now in register")
// })


//install package npm i nodemon for run nodemon in cmd(2)
//install package npm i express for express.js use(3)