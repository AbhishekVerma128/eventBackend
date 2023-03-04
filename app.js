const express = require("express")
const mongoose = require("mongoose")
const vendor = require("./routes/vendor")
const user = require("./routes/user")
const proposal = require('./routes/proposals')
const app = express()
const cors = require("cors")
const port = process.env.port || 5000;
app.use(cors())
mongoose.set("strictQuery",false)
const DB = 'mongodb+srv://parthThacker:parth1213@cluster0.twdoy22.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{console.log("Connected");}).catch((err)=>{console.log(err.message);})
//app.use(require("./route/Route"))
app.use(express.json())
app.use(vendor)
app.use(proposal)
app.use("/",user)

app.get("/",(req,res)=>{
    res.send("ok")
})

app.listen(port,()=>{console.log("Server is up")})
