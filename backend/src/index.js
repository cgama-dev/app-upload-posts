require("dotenv").config();

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

const router = require('./routes')

mongoose.connect('mongodb://dbupload:dbupload123@ds145118.mlab.com:45118/dbupload', {
    useCreateIndex: true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', () => console.log('Erro ao conectar ao banco'))

db.once('open', () => console.log(`Conexão estabelecida com sucesso ${new Date()}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/posts', router)

app.listen(5000, () => console.log('Api uploads...'))