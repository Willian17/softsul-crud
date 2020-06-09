const express = require('express')
const cors = require('cors')
const http = require('http')
const routes = require('./src/routes')

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(express.json());
app.use(routes)

const porta = 3333
server.listen(porta, () =>{
    console.log('servidor ligado na porta ' + porta)
})
