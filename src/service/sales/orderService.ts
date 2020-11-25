import Order from '../../model/sales/order'
import OrderItem from '../../model/sales/orderItem'
import OrderItemVariant from '../../model/sales/orderItemVariant'

const get_PeddingItems = (order: Order): OrderItem[] => {
  const items: OrderItem[] =
    order.items?.filter(item => !item.status || item.status === 'open') || []

  return items
}

const get_ApprovalItems = (order: Order): OrderItem[] => {
  const items: OrderItem[] =
    order.items?.filter(item => !item.status || item.status === 'open') || []

  return items
}

const update_OrderPeddingStatus = (order: Order) => {
  const items: OrderItem[] =
    order.items?.filter(item => !item.status || item.status === 'open') || []

  order.items
    ?.filter(item => !item.status || item.status === 'open')
    .forEach(function (item) {
      const qntItemTotal: number = item.itemVarients?.reduce(
        (sum, current) => sum + current.quantity,
        0
      )
      if (qntItemTotal === item.quantity) {
        item.status = 'close'
      }
    })
}

export { get_PeddingItems, update_OrderPeddingStatus }
