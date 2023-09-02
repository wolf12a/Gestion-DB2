const express = require('express')
const rutas = require('./routes/alquiler.routes')
const cors = require('cors')
var morgan = require('morgan')


const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(rutas)

app.listen(8080)