require('dotenv').config()

const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const fs = require('fs') 

const fileRouter = require('./routers/fileRouter');
const mongoConfig  = require('./configs/mongo');
const { errorHandler } = require('./middleware/errorMiddleware');


const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use('/uploads', express.static('uploads')); 


app.use(bodyParser.raw({
  type: 'application/octet-stream',
  limit: '100mb'
}));


app.use('/', fileRouter)
app.use(errorHandler)


// connecting to mongodb
mongoConfig().then( () => {
    console.log("Connected to mongodb server")
})
.catch( (err) => {
    console.log(err.message)
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})