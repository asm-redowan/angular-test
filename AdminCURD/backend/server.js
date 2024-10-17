const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(express.json())
app.use(morgan('dev'));

//new
app.use(cors());


//model migrate
require('./common/common')

dotenv.config()

// Add this middleware to parse incoming JSON requests
app.use(express.json());




//route
app.use('/group',require('./routing/groupRouter'))
app.use('/company',require('./routing/companyRouter'))
app.use('/user',require('./routing/userRouter'))
app.use('',require('./routing/loginRouter'))





app.use(bodyParser.json())


app.listen(process.env.PORT)


