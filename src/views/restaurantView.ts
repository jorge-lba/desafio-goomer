import { DataRestaurant } from '../@types/TypesRestaurant'
import imagesView from '../views/imagesView'

export default {
  render (restaurant: DataRestaurant) {
    return {
      name: restaurant.name,
      address: restaurant.address,
      working_hours: restaurant.working_hours,
      images: imagesView.renderMany(restaurant.images)
    }
  },

  renderMany (restaurants: DataRestaurant[]) {
    return restaurants.map(restaurant => this.render(restaurant))
  }
}
