import app from './app';
import { config } from 'dotenv'

import './database/connection'
config()

const PORT = process.env.PORT || 3333

app.listen(PORT)
