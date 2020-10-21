import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
 
const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
  return res.json({ status: 201 })
})

routes.post('/restaurants', upload.array('images'), (req, res) => {
  console.log(req.body)
  return res.json({ status: 201, resp: req.body })
})

export default routes
