const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

require('./Models/db')

app.use(cors());
app.use(bodyParser.json());

// Routers

const TaskRouter = require('./Routes/TaskRoute');

app.get('/',(req,res)=>{
    res.send("This is Home Page!!");
})


app.use("/createTask",TaskRouter);



app.listen(PORT,()=>{
   console.log(`Server is running on Port: ${PORT}`); 
});