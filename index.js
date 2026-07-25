
require('dotenv').config()

const express = require('express')

const sequelize = require('./db')
const models = require('./models/models')

const cors = require('cors')

const fileUpload = require('express-fileupload')

const router = require('./routes/index')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

// app.listen(
//     PORT,
//     // callback
//     ()=>console.log( `Server started on port ${PORT}` )
// )

// for requests from brauser to server
app.use(cors())

// we do this so that our application can parse json format
app.use(express.json())

// for razdacha statiki
app.use(express.static(path.resolve(__dirname, 'static')))

// for work with files
app.use(fileUpload({}))

app.use('/api', router)

// // Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
