import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import RestaurantControllers from './controllers/RestaurantControllers'
import ProductControllers from './controllers/ProductController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
  return res.json({ status: 201 })
})

routes.get('/restaurants', RestaurantControllers.index)
routes.get('/restaurants/:id', RestaurantControllers.show)
routes.post('/restaurants', upload.array('images'), RestaurantControllers.create)
routes.put('/restaurants/:id', RestaurantControllers.update)
routes.delete('/restaurants/:id', RestaurantControllers.delete)

routes.get('/restaurants/:id/products', ProductControllers.show)
routes.get('/products', ProductControllers.index)
routes.post('/restaurants/:id/products', upload.array('images'), ProductControllers.create)
routes.put('/products/:id', ProductControllers.update)
routes.delete('/products/:id', ProductControllers.delete)

export default routes
