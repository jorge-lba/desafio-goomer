import { getRepository } from 'typeorm'
import Errors from '../models/Errors'

export default {
  async create (erro:any, body:any) {
    const {
      message,
      name,
      query
    } = erro

    const request = JSON.stringify(body)

    const errorRepository = getRepository(Errors)

    // @ts-ignore
    const error = await errorRepository.create({
      message,
      error: name,
      query: query || 'Empty',
      parameters: request,
      date: new Date()
    })

    await errorRepository.save(error)
  }
}
