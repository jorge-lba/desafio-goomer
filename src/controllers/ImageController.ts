import { Request, Response, Express } from 'express'
import { getRepository, Repository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import { formatImage } from '../utils/image'

import ProductImages from '../models/ProductImages'
import RestaurantImages from '../models/RestaurantsImages'
import imagesView from '../views/imagesView'

import { Image } from '../@types/TypesRestaurant'

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
    const images = formatImage(requestImages)
    const id = parseInt(request.params.id)
    const option = request.url.split('/')[2] || 'restaurants'

    const imageRepository = selectRepositoryImage(option)

    for (const image of images) {
      const imageSave:Image = {
        path: image.path
      }

      if (option === 'restaurants') {
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
  },

  async update (request:Request, response:Response) {
    const id = parseInt(request.params.id)
    const imageId = parseInt(request.params.imageId)

    const requestImages = request.files as Express.Multer.File[]

    const [dataImage] = formatImage(requestImages)

    const option = request.url.split('/')[2] || 'restaurants'

    const imageRepository = selectRepositoryImage(option)

    const imageFind = await imageRepository.findOneOrFail({
      [`${option.substring(0, option.length - 1)}_id`]: id,
      id: imageId
    })

    const file = path.join(__dirname, '..', '..', 'uploads', option, imageFind.path)

    await fs.unlinkSync(file)

    await imageRepository.update({ id: imageId }, dataImage)

    const image:Image = {
      [`${option.substring(0, option.length - 1)}_id`]: id,
      id: imageId,
      ...dataImage
    }

    return response.status(201).json({
      status: 201,
      data: imagesView.render(image)
    })
  },

  async delete (request:Request, response:Response) {
    const id = parseInt(request.params.id)
    const imageId = parseInt(request.params.imageId)

    const option = request.url.split('/')[2] || 'restaurants'

    const imageRepository = selectRepositoryImage(option)

    const imageFind = await imageRepository.findOneOrFail({
      [`${option.substring(0, option.length - 1)}_id`]: id,
      id: imageId
    })

    const file = path.join(__dirname, '..', '..', 'uploads', option, imageFind.path)

    await fs.unlinkSync(file)

    await imageRepository.delete({ id: imageId })

    return response.status(201).json({
      status: 201,
      message: `Imagem de ID ${id} foi excluído`
    })
  }
}
