import { Request, Response, Express } from 'express'
import { getRepository } from 'typeorm'
import { Image } from '../@types/TypesRestaurant'
import ProductImages from '../models/ProductImages'
import RestaurantImages from '../models/RestaurantsImages'
import imagesView from '../views/imagesView'

const formatImages = (images: Express.Multer.File[]): Image[] =>
  images?.map(image => ({
    path: image.filename
  }))

export default {
  async create (request:Request, response:Response) {
    const requestImages = request.files as Express.Multer.File[]
    const images = formatImages(requestImages)
    const id = parseInt(request.params.id)
    const option = request.url.split('/')[2] || 'restaurant'
    console.log(option)
    const options = {
      restaurant: RestaurantImages,
      product: ProductImages
    }

    // @ts-ignore
    const imageRepository = getRepository<Image>(options[option])

    for (const image of images) {
      const imageSave:Image = {
        path: image.path
      }

      if (option === 'restaurant') {
        imageSave.restaurant_id = id
      } else {
        imageSave.product_id = id
      }

      const restaurantImage = await imageRepository.create(imageSave)
      await imageRepository.save(restaurantImage)
    }

    return response.status(201).json({
      status: 201,
      data: imagesView.renderMany(images)
    })
  }
}
