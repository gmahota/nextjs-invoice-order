import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { serverClient } from '../../../../../../utils/fauna-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req

  const { code, customer, reference, status, total } = req.body

  try {
    await serverClient.query(
      q.Update(q.Ref(q.Collection('Documents'), id), {
        data: {
          code,
          customer,
          reference,
          status,
          total
        }
      })
    )
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
