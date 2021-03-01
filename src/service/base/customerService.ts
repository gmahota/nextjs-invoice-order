import { Customer } from '../../model/base/customer'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const get_CustomerById = async (id: number): Promise<Customer> => {
  try {
    const response = await fetch(
      publicRuntimeConfig.SERVER_URI + `base/customers/${id}`
    )

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

const get_Customers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(
      publicRuntimeConfig.SERVER_URI + 'base/customers'
    )

    const list = await response.json()
    return list
  } catch (e) {
    throw e
  }
}
export { get_CustomerById, get_Customers }
