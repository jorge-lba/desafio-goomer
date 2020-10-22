/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Request, Response, Express } from 'express'
import { getRepository } from 'typeorm'
import Restaurant from '../models/Restaurant'

interface RequestBody {
  name: string,
  street: string,
  number: number,
  complement:string,
  state: string,
  city:string,
  zip_code: string,
  weekdays_start:string[],
  weekdays_end: string[],
  opening_times:string[],
  closing_times:string[]
}

interface Address {
  street: string,
  number: number,
  complement:string,
  state: string,
  city:string,
  zip_code: string
}

interface WorkingHours {
  weekday_start:string,
  weekday_end: string,
  opening_time:string,
  closing_time:string,
}

interface Image {
  path: string
}

interface DataRestaurant {
  name:string,
  address?: Address,
  working_hours?:WorkingHours[]
  images?:Image[],
}

interface WorkingHoursRequest {
  weekdays_start:string[],
  weekdays_end: string[],
  opening_times:string[],
  closing_times:string[],
}

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
        data: restaurant
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
