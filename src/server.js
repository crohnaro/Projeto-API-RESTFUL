const express = require('express')
//const path = require('path')

const cors = require('cors')

const db = require('./database/db')
const routes = require('./routes/routes')

const app = express()


//donexçao com banco de dados
db.connect()

const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://meuapp.com',
]

//habilitando cors
app.use(cors({
    origin: function(origin, callback) {
        let allowed = true

        //mobile app
        if (!origin) allowed = true

        if (allowedOrigins.includes(origin)) 
        
        callback(null, allowed)
    }
}))

//habilita server para receber dados json
app.use(express.json())

//Definindo rotas
app.use('/api', routes)



//executando servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log('Server listening on port ' + port))