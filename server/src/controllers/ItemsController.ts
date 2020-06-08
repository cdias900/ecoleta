// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const items = await knex('items').select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.10:3001/uploads/${item.image}`,
      }
    })

    return res.json(serializedItems)
  }
}

export default new ItemsController()
