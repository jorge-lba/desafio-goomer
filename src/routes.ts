import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ status: 201 })
})

export default routes
