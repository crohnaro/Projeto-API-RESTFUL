const express = require('express')
//const path = require('path')

const db = require('./database/db')
const routes = require('./routes/routes')

const app = express()

//donexçao com banco de dados
db.connect()

//habilita server para receber dados json
app.use(express.json())

//Definindo rotas
app.use('/api', routes)



//executando servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log('Server listening on port ' + port))