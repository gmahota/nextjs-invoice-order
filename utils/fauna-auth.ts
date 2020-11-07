import faunadb from 'faunadb'

export const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: 'db.fauna.com',
  scheme: 'https'
})
