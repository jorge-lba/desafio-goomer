/* eslint-disable camelcase */
import { Request, Response, Express } from 'express'
import { getRepository } from 'typeorm'
import Product from '../models/Product'
import productView from '../views/productView'
import {
  ProductRequestBody,
  Promotion,
  Image,
  DataProduct
} from '../@types/TypesProducts'

const formatImages = (images: Express.Multer.File[]): Image[]|undefined =>
  images
    ? images.map(image => ({
      path: image.filename
    }))
    : undefined

export default {
  async create (request: Request, response: Response) {
    const restaurant_id = parseInt(request.params.id)
    const {
      name,
      price,
      description,
      promotion_prices,
      promotion_descriptions,
      weekdays_start,
      weekdays_end,
      times_start,
      times_end,
      valid
    }:ProductRequestBody = request.body

    const requestImages = request.files as Express.Multer.File[]

    const images = formatImages(requestImages)

    const promotions = weekdays_start?.map((weekday, index): Promotion => {
      return {
        price: promotion_prices[index],
        description: promotion_descriptions[index],
        weekday_start: weekday,
        weekday_end: weekdays_end[index],
        time_start: times_start[index],
        time_end: times_end[index],
        valid: valid[index]
      }
    })

    const productRepository = getRepository<DataProduct>(Product)

    const product = await productRepository.create({
      restaurant_id,
      name,
      price,
      description,
      promotions: promotions,
      product_images: images
    })

    await productRepository.save(product)

    return response.status(201).json({
      status: 201,
      data: productView.render(product)
    })
  }
}
