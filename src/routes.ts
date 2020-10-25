import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import RestaurantControllers from './controllers/RestaurantControllers'
import ProductControllers from './controllers/ProductController'
import ImageControllers from './controllers/ImageController'

const routes = Router()
const upload = multer(uploadConfig)

routes.post('/images/restaurants/:id', upload.array('images'), ImageControllers.create)
routes.get('/images/restaurants', ImageControllers.index)
routes.get('/images/restaurants/:id', ImageControllers.show)

routes.post('/images/products/:id', upload.array('images'), ImageControllers.create)
routes.get('/images/products', ImageControllers.index)
routes.get('/images/products/:id', ImageControllers.show)

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
