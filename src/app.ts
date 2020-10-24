import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'
import path from 'path'

import errorHandler from './errors/handler'

const UPLOADS = path.join(__dirname, '..', 'uploads')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(UPLOADS))
app.use(errorHandler)

export default app
