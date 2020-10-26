import { Express } from 'express'
import { Image } from '../@types/TypesRestaurant'

const formatImage = (images: Express.Multer.File[]): Image[] =>
images?.map(image => ({
  path: image.filename
}))
const formatManyImages = (images: Express.Multer.File[]): Image[]|undefined =>
  images
    ? images.map(image => ({
      path: image.filename
    }))
    : undefined

export {
  formatManyImages,
  formatImage
}
