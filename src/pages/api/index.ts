import { NextApiRequest, NextApiResponse } from 'next'

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // ok
    res.status(200).json({ msg: 'Bem Vindo ao API' })
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message })
  }
}
