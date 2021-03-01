import { Product } from '../../model/base/product'
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const get_ProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(
      `${publicRuntimeConfig.SERVER_URI}base/Products/${id}`
    )

    const { code, description, price } = await response.json()
    const data = {
      id: id.toString(),
      code,
      description,
      price
    }
    return data
  } catch (e) {
    throw e
  }
}

const get_Products = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${publicRuntimeConfig.SERVER_URI}base/Products`
    )

    const list = await response.json()

    return list
  } catch (e) {
    throw e
  }
}
export { get_ProductById, get_Products }
