import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
 
const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', (req, res) => {
  return res.json({ status: 201 })
})

routes.post('/restaurants', upload.array('images'), (req, res) => {
  
  return res.json({
    status:201,
    data:{
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
      '1.jpg',
      '2.jpeg',    
      '3.jpg',
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
  })
})

export default routes
