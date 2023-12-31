const express =  require("express");
const { connection } = require("./Config/Config");

const { userRouter } = require("./Routes/User.routes");

const { propertyRouters } = require("./Routes/Property.routes");

const { authenticate } = require("./Middleware/authenticate.middleware");

require('dotenv').config()

const app = express();
app.use(express.json());

var cors = require('cors');
const { bookingRouters } = require("./Routes/Booking.routes");
app.use(cors())


app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/user",userRouter)
app.use(authenticate)

app.use("/prop",propertyRouters)

app.use("/book",bookingRouters)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connection");
     }catch(err){
        console.log("not connected");
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`)
})