import request from 'supertest'
import app from '../../src/app';

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
      '../assets/1.jpeg',
      '../assets/2.jpeg',
      '../assets/3.jpeg'
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

  it('Deve cadastrar um novo restaurante', async () => {
    const restaurant = await request(app)
      .post('/restaurants')
      .accept('application/json')
      .field('name', restaurantData.name)
      .field('street', restaurantData.address.street)
      .field('number', restaurantData.address.number)
      .field('complement', restaurantData.address.complement)
      .field('state', restaurantData.address.state)
      .field('city', restaurantData.address.city)
      .field('zip_code', restaurantData.address.zip_code)
      .attach('image[0]', restaurantData.images[0])
      .attach('image[1]', restaurantData.images[1])
      .attach('image[2]', restaurantData.images[2])
      .field('weekday[0]', restaurantData.workingHours[0].weekday)
      .field('openingTime[0]', restaurantData.workingHours[0].openingTime)
      .field('closingTime[0]', restaurantData.workingHours[0].closingTime)
      .field('weekday[1]', restaurantData.workingHours[1].weekday)
      .field('openingTime[1]', restaurantData.workingHours[1].openingTime)
      .field('closingTime[1]', restaurantData.workingHours[1].closingTime)
      .field('weekday[2]', restaurantData.workingHours[2].weekday)
      .field('openingTime[2]', restaurantData.workingHours[2].openingTime)
      .field('closingTime[2]', restaurantData.workingHours[2].closingTime)
      .end()
  })
})