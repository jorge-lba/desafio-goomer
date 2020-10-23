import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path'

const UPLOADS = path.join(__dirname, '..', 'uploads')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(UPLOADS))

export default app
