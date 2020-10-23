/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Request, Response, Express } from 'express'
import { getRepository } from 'typeorm'
import Restaurant from '../models/Restaurant'
import restaurantView from '../views/restaurantView'

import {
  RequestBody,
  Address,
  WorkingHours,
  Image,
  DataRestaurant,
  WorkingHoursRequest
} from '../@types/TypesRestaurant'
import RestaurantAddress from '../models/RestaurantAddress'
import RestaurantWorkingHours from '../models/RestaurantWorkingHours'

const formatWorkHours = (weekdaysStart:WorkingHoursRequest):WorkingHours[]|undefined =>
  weekdaysStart.weekdays_start
    ? weekdaysStart.weekdays_start
      .map((weekday, index) => ({
        weekday_start: weekday,
        weekday_end: weekdaysStart.weekdays_end[index],
        opening_time: weekdaysStart.opening_times[index],
        closing_time: weekdaysStart.closing_times[index]
      }))
    : undefined

const formatImages = (images: Express.Multer.File[]): Image[]|undefined =>
  images
    ? images.map(image => ({
      path: image.filename
    }))
    : undefined

export default {
  async index (request:Request, response:Response) {
    const restaurantsRespository = getRepository<DataRestaurant>(Restaurant)

    const restaurants = await restaurantsRespository.find({
      relations: ['images', 'address', 'working_hours']
    })

    return response.status(200).json({
      status: 200,
      data: restaurantView.renderMany(restaurants)
    })
  },

  async show (request:Request, response:Response) {
    const { id } = request.params

    const restaurantsRespository = getRepository<DataRestaurant>(Restaurant)

    const restaurant = await restaurantsRespository.findOneOrFail(id, {
      relations: ['images', 'address', 'working_hours']
    })

    return response.status(200).json({
      status: 200,
      data: restaurantView.render(restaurant)
    })
  },

  async create (request: Request, response: Response) {
    try {
      const {
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
        weekdays_start,
        weekdays_end,
        opening_times,
        closing_times
      }: RequestBody = request.body

      const requestImages = request.files as Express.Multer.File[]

      const address: Address = {
        street,
        number,
        complement,
        state,
        city,
        zip_code
      }

      const working_hours = formatWorkHours({
        weekdays_start,
        weekdays_end,
        opening_times,
        closing_times
      })

      const images = formatImages(requestImages)

      const restaurantRespository = getRepository<DataRestaurant>(Restaurant)

      const restaurant = restaurantRespository.create({
        name,
        address,
        working_hours,
        images
      })

      await restaurantRespository.save(restaurant)

      return response.status(201).json({
        status: 201,
        data: restaurantView.render(restaurant)
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        status: 500,
        error
      })
    }
  },

  async update (request: Request, response: Response) {
    try {
      const dataRestaurant: DataRestaurant = request.body

      const { id } = request.params

      const tables:string[] = Object.keys(dataRestaurant)

      const optionsTable = (option:string, dataRestaurant:DataRestaurant) => {
        const index = ['name', 'address', 'working_hours'].indexOf(option)

        const options = [
          {
            id: dataRestaurant.id,
            repositoryCall: () => getRepository<DataRestaurant>(Restaurant),
            data: { name: dataRestaurant.name }
          },
          {
            id: dataRestaurant.address.id,
            repositoryCall: () => getRepository<Address>(RestaurantAddress),
            data: dataRestaurant.address
          },
          {
            id: dataRestaurant.working_hours.map(({ id }) => id),
            repositoryCall: () => getRepository<WorkingHours>(RestaurantWorkingHours),
            data: dataRestaurant.working_hours.map(working_hours => working_hours)
          }
        ]

        return options[index]
      }

      for (let i = 0; i < tables.length; i++) {
        const option = tables[i] ? tables[i] : 'name'

        const { repositoryCall, data, id: idData } = optionsTable(option, dataRestaurant)

        if (idData instanceof Array && data instanceof Array) {
          const repository = repositoryCall()

          for (let i = 0; i < idData.length; i++) {
            // @ts-ignore
            const { restaurant_id } = await repository.findOneOrFail(idData[i])

            if (restaurant_id === parseInt(id)) {
              await repository.update({ id: idData[i] }, data[i])
            }
          }
        } else {
          const ID = (idData instanceof Array ? idData[0] : idData) || parseInt(id)
          const DATA = data instanceof Array ? data[0] : data

          const repository = repositoryCall()
          await repository.update({ id: ID }, DATA)
        }
      }

      const restaurantsRespository = getRepository<DataRestaurant>(Restaurant)
      const restaurant = await restaurantsRespository.findOneOrFail(id, {
        relations: ['images', 'address', 'working_hours']
      })

      return response.status(200).json({
        status: 200,
        data: restaurantView.render(restaurant)
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        status: 500,
        error
      })
    }
  }
}
