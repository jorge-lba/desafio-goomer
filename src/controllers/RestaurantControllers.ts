/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Request, Response, Express } from 'express'
import { getRepository } from 'typeorm'
import { formatWorkingHour, testScheduleFormat, formatWorkingHourRequest } from '../utils/hours'

import {
  RequestBody,
  Address,
  WorkingHours,
  Image,
  DataRestaurant
} from '../@types/TypesRestaurant'

import Restaurant from '../models/Restaurant'
import restaurantView from '../views/restaurantView'
import RestaurantAddress from '../models/RestaurantAddress'
import RestaurantWorkingHours from '../models/RestaurantWorkingHours'

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

    try {
      const restaurant = await restaurantsRespository.findOneOrFail(id, {
        relations: ['images', 'address', 'working_hours']
      })

      return response.status(200).json({
        status: 200,
        data: restaurant instanceof Restaurant
          ? restaurantView.render(restaurant)
          : {}
      })
    } catch (error) {
      return response.status(200).json({
        status: 200,
        data: {}
      })
    }
  },

  async create (request: Request, response: Response) {
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

    const SCHEDULE_REG_EXP = /([0[0-9]|1[0-9]|2[0-3])(:)([0-5][0-9])/

    const scheduleOpeningIsValid = opening_times
      .map((schedule) => testScheduleFormat(SCHEDULE_REG_EXP)(schedule))

    const scheduleClosingIsValid = closing_times
      .map((schedule) => testScheduleFormat(SCHEDULE_REG_EXP)(schedule))

    const orderScheduleFormat = scheduleOpeningIsValid
      .map((schedule, index) => schedule && scheduleClosingIsValid[index])

    const workingHoursRequest = formatWorkingHourRequest({
      weekdays_start,
      weekdays_end,
      opening_times,
      closing_times
    })

    const working_hours = workingHoursRequest
      .filter((workingHours, index): WorkingHours | undefined => {
        if (workingHours && orderScheduleFormat[index]) {
          return workingHours
        }
      }).map(working_hour => formatWorkingHour(working_hour))

    const warnings = workingHoursRequest
      .filter((_, index) => !orderScheduleFormat[index])
      .map(workingHour => ({
        working_hour: workingHour,
        message: 'Este horário não foi cadastrado. Verifique as informações e tente cadastra-lo novamente.'
      }))

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
      data: restaurantView.render(restaurant),
      warnings
    })
  },

  async update (request: Request, response: Response) {
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
          id: dataRestaurant.working_hours?.map(({ id }) => id),
          repositoryCall: () => getRepository<WorkingHours>(RestaurantWorkingHours),
          data: dataRestaurant.working_hours?.map(working_hours => working_hours)
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
  },

  async delete (request:Request, response:Response) {
    const { id } = request.params

    const restaurantsRespository = getRepository<DataRestaurant>(Restaurant)

    await restaurantsRespository.delete(id)

    return response.status(200).json({
      status: 200,
      message: `Restaurante de ID ${id} foi excluído`
    })
  }
}
