import { Image } from '../@types/TypesRestaurant'

export default {
  render (image: Image) {
    return {
      id: image.id,
      product_id: image.product_id,
      restaurant_id: image.restaurant_id,
      url: `http://localhost:${process.env.PORT || 3333}/uploads/${image.path}`
    }
  },

  renderMany (images: Image[]) {
    return images.map(image => this.render(image))
  }
}
