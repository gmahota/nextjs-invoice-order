import OrderItem from './orderItem'

interface Order {
  id: string
  code: string
  customer: string
  name: string
  vat: string
  status: string
  total: number
  items: Array<OrderItem>
}

export default Order
