import request from 'supertest'
import app from '../../src/app'
import path from 'path'

jest.setTimeout(30000)

describe('Restaurant', () => {
  const restaurantData = {
    name: 'Big Meat',
    address: { 
      street: 'Rua Burger',
      number: 275,
      complement: 'none',
      state: 'São Paulo',
      city: 'Sorocaba',
      zip_code: '180.50-060'
    },
    images: [
      path.join(__dirname, '..', 'assets', '1.jpg'),
      path.join(__dirname, '..', 'assets', '2.jpeg'),      
      path.join(__dirname, '..', 'assets', '3.jpg'),
    ],
    workingHours:[
      { 
        weekday: 'sexta',
        openingTime: '11:30',
        closingTime: '24:00'
      },
      { 
        weekday: 'sábado',
        openingTime: '15:30',
        closingTime: '24:00'
      },
      { 
        weekday: 'domingo',
        openingTime: '15:30',
        closingTime: '20:00'
      },
    ]
  }

  const dataTest = {...restaurantData}
  dataTest.images = [
    '1.jpg',
    '2.jpeg',    
    '3.jpg',
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
      .field('weekday[0]', restaurantData.workingHours[0].weekday)
      .field('openingTime[0]', restaurantData.workingHours[0].openingTime)
      .field('closingTime[0]', restaurantData.workingHours[0].closingTime)
      .field('weekday[1]', restaurantData.workingHours[1].weekday)
      .field('openingTime[1]', restaurantData.workingHours[1].openingTime)
      .field('closingTime[1]', restaurantData.workingHours[1].closingTime)
      .field('weekday[2]', restaurantData.workingHours[2].weekday)
      .field('openingTime[2]', restaurantData.workingHours[2].openingTime)
      .field('closingTime[2]', restaurantData.workingHours[2].closingTime)
      .attach('images', restaurantData.images[0])

    expect(response.body.status).toBe(201)

    const restaurant = response.body.data
    
    expect(restaurant.address).toMatchObject(dataTest.address)
    expect(restaurant.name).toBe(dataTest.name)
    expect(restaurant.images).toEqual([...dataTest.images])
    expect(restaurant.workingHours).toEqual([...dataTest.workingHours])
  })
})