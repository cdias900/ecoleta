import express from 'express'
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'

import * as Controllers from './controllers'
import multerConfig from './config/multer'

const upload = multer(multerConfig)

const routes = express.Router()

routes.get('/items', Controllers.Items.index)

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  Controllers.Points.create
)
routes.get('/points', Controllers.Points.index)
routes.get('/points/:id', Controllers.Points.show)

export default routes
