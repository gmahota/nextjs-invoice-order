import { query as q } from 'faunadb'
import { serverClient } from '../../../../../utils/fauna-auth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req

  try {
    await serverClient.query(q.Delete(q.Ref(q.Collection('Orders'), id)))
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
