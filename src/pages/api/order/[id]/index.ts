import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { serverClient } from '../../../../../utils/fauna-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req

  try {
    const order: any = await serverClient.query(
      q.Get(q.Ref(q.Collection('Orders'), id))
    )
    res.status(200).json(order.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
