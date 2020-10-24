import { ErrorRequestHandler } from 'express'
import ErrorController from '../controllers/ErrorController'

const errorHandler:ErrorRequestHandler = async (error, request, response, next) => {
  await ErrorController.create(error, request.body)

  return response.status(500).json({
    status: 500,
    message: 'Erro interno do servidor.'
  })
}

export default errorHandler
