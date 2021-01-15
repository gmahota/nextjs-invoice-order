import { Product } from '../../model/base/product'

const get_ProductById = async (id: number): Promise<Product> => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + `/api/Products/${id}`)

    const { code, description, price } = await response.json()
    const data: Product = {
      id,
      code,
      description,
      price
    }
    return data
  } catch (e) {
    throw e
  }
}

const get_Products: Product[] = async (): Product[] => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + '/api/Products')

    const list = await response.json()

    return list
  } catch (e) {
    throw e
  }
}
export { get_ProductById, get_Products }
