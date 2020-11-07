import OrderItem from './orderItem'

interface Order {
  id: number
  code: string
  customer: string
  name: string
  vat: string
  status: string
  total: number
  items: OrderItem[]
}

export default Order
