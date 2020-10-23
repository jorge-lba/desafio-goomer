import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import RestaurantControllers from './controllers/RestaurantControllers'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
  return res.json({ status: 201 })
})

routes.get('/restaurants', RestaurantControllers.index)
routes.get('/restaurants/:id', RestaurantControllers.show)
routes.post('/restaurants', upload.array('images'), RestaurantControllers.create)

export default routes
