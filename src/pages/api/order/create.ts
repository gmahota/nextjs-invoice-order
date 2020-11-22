import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { serverClient } from '../../../../utils/fauna-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, customer, name, vat, status, total, items } = req.body

  try {
    await serverClient.query(
      q.Create(q.Collection('Orders'), {
        data: {
          code,
          customer,
          name,
          vat,
          status,
          total,
          OrderItems: items
        }
      })
    )
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
