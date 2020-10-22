import request from 'supertest'
import app from '../../src/app'
import path from 'path'
import fs from 'fs'
import { createConnection, getConnection } from 'typeorm'
import { Image } from '../../src/@types/TypesRestaurant'

jest.setTimeout(30000)

describe('Restaurant', () => {
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
        weekday_start: 'segunda',
        weekday_end: 'sexta',
        opening_time: '11:30',
        closing_time: '24:00'
      },
      {
        id: 2,
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

  it('Deve cadastrar um novo restaurante com todos os dados', async () => {
    const response = await request(app)
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

    expect(response.body.status).toBe(201)

    const restaurant = response.body.data

    const responseImages = restaurant.images.map((image:Image) => image.url?.split('-')[1])

    expect(restaurant.address).toMatchObject(dataTest.address)
    expect(restaurant.name).toBe(dataTest.name)
    expect(responseImages).toEqual(dataTest.images)
    expect(restaurant.working_hours).toEqual(dataTest.workingHours)
  })
})
