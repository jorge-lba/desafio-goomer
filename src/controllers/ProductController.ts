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

    const products = await productsRespository.find()

    const products_relations = await relations(products)

    return response.status(200).json({
      status: 200,
      data: productView.renderMany(products_relations)
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
      category,
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
      category,
      promotions: promotions,
      product_images: images
    })

    await productRepository.save(product)

    return response.status(201).json({
      status: 201,
      data: productView.render(product)
    })
  },

  async update (request: Request, response: Response) {
    const dataProduct: DataProduct = request.body
    const id = request.params.id

    const tables:string[] = Object.keys(dataProduct)

    const optionsTable = (option:string | null, dataProduct:DataProduct) => {
      const index = option === 'promotions' ? 1 : 0
      const options = [
        {
          id: dataProduct.id,
          repositoryCall: () => getRepository<DataProduct>(Product),
          data: {
            name: dataProduct.name,
            price: dataProduct.price,
            category: dataProduct.category
          }
        },
        {
          id: dataProduct.promotions?.map(({ id }) => id),
          repositoryCall: () => getRepository<Promotion>(ProductPromotion),
          data: dataProduct.promotions?.map(promotion => promotion)
        }
      ]
      return options[index]
    }

    for (let i = 0; i < tables.length; i++) {
      const option = tables[i] ? tables[i] : null

      const { repositoryCall, data, id: idData } = optionsTable(option, dataProduct)

      if (idData instanceof Array && data instanceof Array) {
        const repository = repositoryCall()

        for (let i = 0; i < idData.length; i++) {
          // @ts-ignore
          const { product_id } = await repository.findOneOrFail(idData[i])

          if (product_id === parseInt(id)) {
            await repository.update({ id: idData[i] }, data[i])
          }
        }
      } else {
        const ID = (idData instanceof Array ? idData[0] : idData) || parseInt(id)
        const DATA = data instanceof Array ? data[0] : data

        const repository = repositoryCall()
        // @ts-ignore
        await repository.update({ id: ID }, DATA)
      }
    }
    const productsRespository = getRepository<DataProduct>(Product)
    const product = await productsRespository.findOneOrFail(id)
    const [products_relation] = await relations([product])

    return response.status(200).json({
      status: 200,
      data: productView.render(products_relation)
    })
  },

  async delete (request:Request, response:Response) {
    const { id } = request.params

    const ProductsRespository = getRepository<DataProduct>(Product)

    await ProductsRespository.delete(id)

    return response.status(200).json({
      status: 200,
      message: `Produto de ID ${id} foi excluído`
    })
  }
}
