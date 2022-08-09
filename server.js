const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD )
// const db = process.env.DATABASE

mongoose.connect(db)
.then((res) => console.log('mongodb connected...')).catch((error) => console.log(error))

console.log(process.env.NODE_ENV)
const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`app is running at port ${PORT}`))