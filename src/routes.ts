import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import RestaurantControllers from './controllers/RestaurantControllers'
import ProductControllers from './controllers/ProductController'
import ImageControllers from './controllers/ImageController'

const routes = Router()
const uploadProducts = multer(uploadConfig('products'))
const uploadRestaurants = multer(uploadConfig('restaurants'))

routes.get('/images/restaurants', ImageControllers.index)
routes.get('/images/restaurants/:id', ImageControllers.show)
routes.post('/images/restaurants/:id', uploadRestaurants.array('images'), ImageControllers.create)
routes.put('/images/restaurants/:id/:imageId', uploadRestaurants.array('images'), ImageControllers.update)

routes.get('/images/products', ImageControllers.index)
routes.get('/images/products/:id', ImageControllers.show)
routes.post('/images/products/:id', uploadProducts.array('images'), ImageControllers.create)
routes.put('/images/products/:id/:imageId', uploadProducts.array('images'), ImageControllers.update)

routes.get('/restaurants', RestaurantControllers.index)
routes.get('/restaurants/:id', RestaurantControllers.show)
routes.post('/restaurants', uploadRestaurants.array('images'), RestaurantControllers.create)
routes.put('/restaurants/:id', RestaurantControllers.update)
routes.delete('/restaurants/:id', RestaurantControllers.delete)

routes.get('/restaurants/:id/products', ProductControllers.show)
routes.get('/products', ProductControllers.index)
routes.post('/restaurants/:id/products', uploadProducts.array('images'), ProductControllers.create)
routes.put('/products/:id', ProductControllers.update)
routes.delete('/products/:id', ProductControllers.delete)

export default routes
