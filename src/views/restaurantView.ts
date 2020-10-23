/* eslint-disable camelcase */
import { DataRestaurant } from '../@types/TypesRestaurant'
import imagesView from '../views/imagesView'

export default {
  render (restaurant: DataRestaurant) {
    const working_hours = restaurant.working_hours

    const formatHours = (hours:string) => {
      const [hour, minute] = hours.split(':')

      return minute !== '00' ? `${hour}h${minute}` : `${hour}h`
    }

    const res = working_hours.reduce((acc, current, index, array) => {
      const {
        weekday_end,
        weekday_start,
        opening_time,
        closing_time
      } = current

      acc += `${weekday_start} à ${weekday_end} das ${formatHours(opening_time)} as ${formatHours(closing_time)}`

      if (index + 1 < array.length) {
        acc += ' e de '
      }

      return acc
    }, 'De ')

    return {
      name: restaurant.name,
      address: restaurant.address,
      working_hours: restaurant.working_hours,
      description_workings_hours: res,
      images: imagesView.renderMany(restaurant.images)
    }
  },

  renderMany (restaurants: DataRestaurant[]) {
    return restaurants.map(restaurant => this.render(restaurant))
  }
}
