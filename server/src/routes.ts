import express from 'express'

import * as Controllers from './controllers'

const routes = express.Router()

routes.get('/items', Controllers.Items.index)

routes.post('/points', Controllers.Points.create)
routes.get('/points', Controllers.Points.index)
routes.get('/points/:id', Controllers.Points.show)

export default routes
