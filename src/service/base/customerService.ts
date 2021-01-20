import { Customer } from '../../model/base/customer'

const get_CustomerById = async (id: number): Promise<Customer> => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + `/api/customers/${id}`)

    const { code, name, vatNumber, address } = await response.json()
    const data: Customer = {
      id,
      code,
      name,
      vatNumber,
      address
    }
    return data
  } catch (e) {
    throw e
  }
}

const get_Customers: Customer[] = async (): Customer[] => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + '/api/customers')

    const list = await response.json()
    return list
  } catch (e) {
    throw e
  }
}
export { get_CustomerById, get_Customers }
