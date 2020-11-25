interface OrderItemVariant {
  id: number
  quantity: number
  price: number
  grossTotal: number
  vatTotal: number
  total: number
  status?: string
}

export default OrderItemVariant
