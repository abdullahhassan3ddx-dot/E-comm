process.on('uncaughtException',(err)=>{
    console.log('erroe in code',err);
    
})

import express from 'express'

import { dbConnne } from './Database/dbConnection.js'
import {bootstrap} from './src/modules/category/bootstrap.js'
import { globalError } from './src/modules/utils/globalError.js'
import { AppError } from './src/modules/middleware/appError.js'

import 'dotenv/config'
const app = express()
const port = 3000
app.use(express.json())
app.set('query parser', 'extended')
app.use('/uploads',express.static('uploads'))
bootstrap(app)
dbConnne()



// app.use((req,res,next)=>{
//     next(new AppError(`route not found:${req.originalUrl} `,404))
    
// })




app.use((req,res,next)=>{
    const err=new AppError(`route not found ${req.originalUrl}`)
    err.status=404
    next(err)
})

app.use(globalError)
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error)
    // process.exit(1)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))