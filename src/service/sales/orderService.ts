import Order from '../../model/sales/order'
import OrderItem from '../../model/sales/orderItem'
import OrderItemVariant from '../../model/sales/orderItemVariant'

const get_PeddingItems = (order: Order): OrderItem[] => {
  const items: OrderItem[] =
    order.items?.filter(item => !item.status || item.status === 'pedding') || []

  return items
}

const get_ApprovalItems = (order: Order): OrderItem[] => {
  const items: OrderItem[] =
    order.items?.filter(item => item.status === 'approval') || []

  return items
}

const set_OrderPeddingStatus = (order: Order) => {
  order.items
    ?.filter(item => !item.status || item.status === 'pedding')
    .forEach(function (item) {
      const qntItemTotal: number = item.itemVarients?.reduce(
        (sum, current) => sum + current.quantity,
        0
      )
      if (qntItemTotal === item.quantity) {
        item.status = 'approval'
      }
    })
}

const set_OrderInvoiceStatus = (
  order: Order,
  rowNumber: number,
  varientNumber: number
) => {
  order.items
    ?.filter(item => !item.status || item.status === 'pedding')
    .forEach(function (item) {
      const qntItemTotal: number = item.itemVarients?.reduce(
        (sum, current) => sum + current.quantity,
        0
      )
      if (qntItemTotal === item.quantity) {
        item.status = 'approval'
      }
    })
}

const get_RowTotalPedding = (order: Order, rowNumber: number): number => {
  const total: number =
    order.items[rowNumber].itemVarients
      ?.filter(item => !item.status || item.status === 'pedding')
      .reduce((sum, current) => sum + current.grossTotal, 0) || 0
  return total
}
const get_RowTotalApproval = (order: Order, rowNumber: number): number => {
  const total: number =
    order.items[rowNumber].itemVarients
      ?.filter(item => !item.status || item.status === 'approval')
      .reduce((sum, current) => sum + current.grossTotal, 0) || 0
  return total
}
const get_RowTotalInvoice = (order: Order, rowNumber: number): number => {
  const total: number =
    order.items[rowNumber].itemVarients
      ?.filter(item => item.status === 'invoice')
      .reduce((sum, current) => sum + current.grossTotal, 0) || 0
  return total
}

export {
  get_PeddingItems,
  set_OrderPeddingStatus,
  get_ApprovalItems,
  get_RowTotalPedding,
  get_RowTotalApproval,
  get_RowTotalInvoice
}
