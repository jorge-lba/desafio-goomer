/* eslint-disable camelcase */
import { Request, Response, Express } from 'express'
import { getRepository } from 'typeorm'
import Product from '../models/Product'
import ProductPromotion from '../models/ProductPromotion'
import ProductImage from '../models/ProductImages'
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

const relations = async (products: DataProduct[]) => {
  const productPromotionsRespository = getRepository<Promotion>(ProductPromotion)
  const productImagesRespository = getRepository<Image>(ProductImage)

  const products_promotions:DataProduct[] = []

  for (const product of products) {
    const promotions = await productPromotionsRespository.find({
      // @ts-ignore
      product_id: product.id
    })

    const images = await productImagesRespository.find({
      // @ts-ignore
      product_id: product.id
    })
    products_promotions.push({ ...product, promotions, product_images: images })
  }

  return products_promotions
}

export default {
  async index (request:Request, response:Response) {
    const productsRespository = getRepository<DataProduct>(Product)

    const products = await productsRespository.find({
      relations: ['products_promotions', 'products_images']
    })

    return response.status(200).json({
      status: 200,
      data: productView.renderMany(products)
    })
  },

  async show (request:Request, response:Response) {
    const { id } = request.params

    const productsRespository = getRepository<DataProduct>(Product)

    // @ts-ignore
    const products = await productsRespository.find({ restaurant_id: id })

    const products_relations = await relations(products)

    return response.status(200).json({
      status: 200,
      data: productView.renderMany(products_relations)
    })
  },

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
