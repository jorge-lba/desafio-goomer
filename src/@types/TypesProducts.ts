/* eslint-disable camelcase */

interface ProductRequestBody {
  name: string,
  price: number,
  description: string,
  promotion_prices: number[],
  promotion_descriptions: string[],
  weekdays_start: number[],
  weekdays_end: number[],
  times_start:string[],
  times_end:string[],
  valid: boolean[]
}

interface Promotion {
  price: number,
  description: string,
  weekday_start: number,
  weekday_end: number,
  time_start: string,
  time_end: string,
  valid: boolean
}

interface Image {
  id?: number,
  url?: string,
  path: string
}

interface DataProduct {
  id?: number,
  restaurant_id: number,
  name: string,
  price: number,
  description: string,
  promotions?: Promotion[]
  product_images: Image[]
}

export {
  ProductRequestBody,
  Promotion,
  Image,
  DataProduct
}
