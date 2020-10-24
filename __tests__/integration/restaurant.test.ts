import request from 'supertest'
import app from '../../src/app'
import path from 'path'
import fs from 'fs'
import { createConnection, getConnection } from 'typeorm'
import { Image } from '../../src/@types/TypesRestaurant'
import { ProductRequestBody } from '../../src/@types/TypesProducts'

jest.setTimeout(30000)
beforeAll(async () => {
  await createConnection({
    type: 'sqlite',
    database: './src/database/test.sqlite',
    migrationsRun: true,
    dropSchema: true,
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: { migrationsDir: './src/database/migrations' }
  })
})

afterAll(async () => {
  const directory = path.join(__dirname, '..', '..', 'uploads')

  await getConnection().close()

  fs.readdir(directory, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err
      })
    }
  })
})

const restaurantData = {
  name: 'Big Meat',
  address: {
    street: 'Rua Burger',
    number: '275',
    complement: 'none',
    state: 'São Paulo',
    city: 'Sorocaba',
    zip_code: '180.50-060'
  },
  images: [
    path.join(__dirname, '..', 'assets', '1.jpg'),
    path.join(__dirname, '..', 'assets', '2.jpeg'),
    path.join(__dirname, '..', 'assets', '3.jpg')
  ],
  workingHours: [
    {
      id: 1,
      restaurant_id: 1,
      weekday_start: 'segunda',
      weekday_end: 'sexta',
      opening_time: '11:30',
      closing_time: '24:00'
    },
    {
      id: 2,
      restaurant_id: 1,
      weekday_start: 'sábado',
      weekday_end: 'domingo',
      opening_time: '15:30',
      closing_time: '24:00'
    }
  ]
}

const dataTest = { ...restaurantData }
dataTest.images = [
  '1.jpg',
  '2.jpeg',
  '3.jpg'
]

const createRestaurant = () => request(app)
  .post('/restaurants')
  .accept('application/json')
  .field('name', restaurantData.name)
  .field('street', restaurantData.address.street)
  .field('number', restaurantData.address.number)
  .field('complement', restaurantData.address.complement)
  .field('state', restaurantData.address.state)
  .field('city', restaurantData.address.city)
  .field('zip_code', restaurantData.address.zip_code)
  .field('weekdays_start[0]', restaurantData.workingHours[0].weekday_start)
  .field('weekdays_end[0]', restaurantData.workingHours[0].weekday_end)
  .field('opening_times[0]', restaurantData.workingHours[0].opening_time)
  .field('closing_times[0]', restaurantData.workingHours[0].closing_time)
  .field('weekdays_start[1]', restaurantData.workingHours[1].weekday_start)
  .field('weekdays_end[1]', restaurantData.workingHours[1].weekday_end)
  .field('opening_times[1]', restaurantData.workingHours[1].opening_time)
  .field('closing_times[1]', restaurantData.workingHours[1].closing_time)
  .attach('images', restaurantData.images[0])
  .attach('images', restaurantData.images[1])
  .attach('images', restaurantData.images[2])

describe('01', () => {
  it('Deve cadastrar um novo restaurante com todos os dados', async () => {
    const response = await createRestaurant()
    await createRestaurant()

    expect(response.body.status).toBe(201)

    const restaurant = response.body.data

    const responseImages = restaurant.images.map((image:Image) => image.url?.split('-')[1])

    expect(restaurant.address).toMatchObject(dataTest.address)
    expect(restaurant.name).toBe(dataTest.name)
    expect(responseImages).toEqual(dataTest.images)
    expect(restaurant.working_hours).toEqual(dataTest.workingHours)
  })

  it('Deve listar os restaurantes', async () => {
    const response = await request(app)
      .get('/restaurants')

    const [restaurant] = response.body.data

    expect(response.body.status).toBe(200)

    const responseImages = restaurant.images.map((image:Image) => image.url?.split('-')[1])

    expect(restaurant.address).toMatchObject(dataTest.address)
    expect(restaurant.name).toBe(dataTest.name)
    expect(responseImages).toEqual(dataTest.images)
    expect(restaurant.working_hours).toEqual(dataTest.workingHours)
  })

  it('Deve retornar apenas um restaurante', async () => {
    const response = await request(app)
      .get('/restaurants/1')

    const restaurant = response.body.data

    expect(response.body.status).toBe(200)

    const responseImages = restaurant.images.map((image:Image) => image.url?.split('-')[1])

    expect(restaurant.address).toMatchObject(dataTest.address)
    expect(restaurant.name).toBe(dataTest.name)
    expect(responseImages).toEqual(dataTest.images)
    expect(restaurant.working_hours).toEqual(dataTest.workingHours)
  })

  it('Deve atualizar os dados de um restaurante', async () => {
    const dataRestaurantUpdate = {
      name: 'Mr. Burger',
      address: {
        street: 'Ruas Burger'
      },
      working_hours: [
        {
          id: 1,
          restaurant_id: 1,
          weekday_start: 2,
          weekday_end: 4,
          opening_time: '11:00',
          closing_time: '21:00'
        },
        {
          id: 2,
          restaurant_id: 1,
          weekday_start: 6,
          weekday_end: 0,
          opening_time: '14:00',
          closing_time: '22:00'
        }]
    }

    const response = await request(app)
      .put('/restaurants/1')
      .send(dataRestaurantUpdate)

    const restaurant = response.body.data

    expect(response.body.status).toBe(200)

    expect(restaurant.name).toBe(dataRestaurantUpdate.name)
    expect(restaurant.address.street).toBe(dataRestaurantUpdate.address.street)
    expect(restaurant.working_hours).toEqual(dataRestaurantUpdate.working_hours)
  })

  it('Deve deletar um restaurante', async () => {
    const response = await request(app)
      .delete('/restaurants/1')

    expect(response.body.status).toBe(200)
    expect(response.body.message).toBe('Restaurante de ID 1 foi excluído')
  })

  const dataProduct: ProductRequestBody = {
    name: 'X-Tudo',
    price: 25.50,
    description: 'Hamburger com ...',
    promotion_prices: [19.99, 15.99],
    promotion_descriptions: ['Lançamento', 'Super PROMO'],
    weekdays_start: [6, 1],
    weekdays_end: [0, 5],
    times_start: ['15:00', '11:00'],
    times_end: ['23:00', '16:00'],
    valid: [true, true]
  }

  test('Deve cadastrar um novo produto', async () => {
    const response = await request(app)
      .post('/restaurants/2/products')
      .field('name', dataProduct.name)
      .field('price', dataProduct.price)
      .field('description', dataProduct.description)
      .field('promotion_prices', dataProduct.promotion_prices)
      .field('promotion_descriptions', dataProduct.promotion_descriptions)
      .field('weekdays_start', dataProduct.weekdays_start)
      .field('weekdays_end', dataProduct.weekdays_end)
      .field('times_end', dataProduct.times_end)
      .field('times_start', dataProduct.times_start)
      .field('valid', dataProduct.valid)
      .attach('images', path.join(__dirname, '..', 'assets', '1.jpg'))

    expect(response.body.status).toBe(201)

    const product = response.body.data

    expect(product.name).toBe(dataProduct.name)
    expect(parseFloat(product.price)).toBe(dataProduct.price)
    expect(product.description).toBe(dataProduct.description)
    expect(parseFloat(product.promotions[0].price)).toBe(dataProduct.promotion_prices[0])
    expect(product.promotions[0].description).toBe(dataProduct.promotion_descriptions[0])
    expect(parseFloat(product.promotions[0].weekday_start)).toBe(dataProduct.weekdays_start[0])
    expect(parseFloat(product.promotions[0].weekday_end)).toBe(dataProduct.weekdays_end[0])
    expect(product.promotions[0].time_end).toBe(dataProduct.times_end[0])
    expect(product.promotions[0].time_start).toBe(dataProduct.times_start[0])
    expect(product.promotions[0].valid).toBe(dataProduct.valid[0].toString())
  })
})
