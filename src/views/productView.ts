/* eslint-disable camelcase */
import { DataProduct } from '../@types/TypesProducts'
import imagesView from '../views/imagesView'

export default {
  render (product: DataProduct) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      promotions: product.promotions,
      restaurant_id: product.restaurant_id,
      product_images: imagesView.renderMany(product.product_images)
    }
  },

  renderMany (products: DataProduct[]) {
    return products.map(product => this.render(product))
  }
}
