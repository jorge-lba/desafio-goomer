import { Request, Response, Express } from 'express'
import { getRepository, Repository } from 'typeorm'
import { Image } from '../@types/TypesRestaurant'
import ProductImages from '../models/ProductImages'
import RestaurantImages from '../models/RestaurantsImages'
import imagesView from '../views/imagesView'

const formatImages = (images: Express.Multer.File[]): Image[] =>
  images?.map(image => ({
    path: image.filename
  }))

const selectRepositoryImage = (option:string): Repository<Image> => {
  const models = {
    restaurants: RestaurantImages,
    products: ProductImages
  }
  // @ts-ignore
  return getRepository<Image>(models[option])
}

export default {
  async index (request:Request, response:Response) {
    const option = request.url.split('/')[2] || 'restaurant'

    const imageRepository = selectRepositoryImage(option)
    const images = await imageRepository.find()

    return response.status(201).json({
      status: 201,
      data: imagesView.renderMany(images)
    })
  },

  async show (request:Request, response:Response) {
    const id = parseInt(request.params.id)

    const option = request.url.split('/')[2] || 'restaurants'

    const imageRepository = selectRepositoryImage(option)
    const images = await imageRepository.find({
      [`${option.substring(0, option.length - 1)}_id`]: id
    })

    return response.status(201).json({
      status: 201,
      data: imagesView.renderMany(images)
    })
  },

  async create (request:Request, response:Response) {
    const requestImages = request.files as Express.Multer.File[]
    const images = formatImages(requestImages)
    const id = parseInt(request.params.id)
    const option = request.url.split('/')[2] || 'restaurant'

    const imageRepository = selectRepositoryImage(option)

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
