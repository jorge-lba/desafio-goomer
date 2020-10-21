import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import routes from './routes'

import './database/connection'
config()

const app = express()

app.use(express.json())
app.use(routes)
app.use(cors())

const PORT = process.env.PORT || 3333

app.listen(PORT)
