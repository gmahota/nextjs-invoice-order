import Order from '../../model/sales/order'
import Invoice from '../../model/sales/invoice'
import OrderItem from '../../model/sales/orderItem'
import OrderItemVariant from '../../model/sales/orderItemVariant'
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const create_Order = async (order: Order) => {
  try {
    const res = await fetch(publicRuntimeConfig.SERVER_URI + 'sales/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })

    return res
  } catch (e: any) {
    console.error(e)
  }
}

const get_Orders = async (): Promise<Order[]> => {
  try {
    let orders = []
    await fetch(publicRuntimeConfig.SERVER_URI + 'sales/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((data: Order[]) => (orders = data))

    return orders
  } catch (e: any) {
    console.error(e)
  }
}

const get_Order = async (id: string): Promise<Order> => {
  try {
    let order = {}
    order = await fetch(publicRuntimeConfig.SERVER_URI + `sales/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((data: Order) => (order = data))

    return order
  } catch (e: any) {
    console.error(e)
  }
}

const get_Invoices = (order: Order): Invoice[] => {
  return order?.Invoices || []
}

const get_TotalInvoices = (order: Order): number => {
  const items: Invoice[] = order.Invoices || []

  let total = 0

  for (let rowNumber = 0; rowNumber < items.length; rowNumber++) {
    total +=
      items[rowNumber].items.reduce((sum, current) => sum + current.total, 0) ||
      0
  }
  return total
}

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

const get_TotalApprovalItems = (order: Order): number => {
  const items: OrderItem[] =
    order.items?.filter(item => item.status === 'approval') || []

  let total = 0

  for (let rowNumber = 0; rowNumber < items.length; rowNumber++) {
    total +=
      order.items[rowNumber].itemVarients
        ?.filter(item => !item.status || item.status === 'approval')
        .reduce((sum, current) => sum + current.grossTotal, 0) || 0
  }
  return total
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

export default {
  create_Order,
  get_Orders,
  get_Order,
  get_Invoices,
  get_TotalInvoices,
  get_PeddingItems,
  set_OrderPeddingStatus,
  get_ApprovalItems,
  get_TotalApprovalItems,
  get_RowTotalPedding,
  get_RowTotalApproval,
  get_RowTotalInvoice,
  set_OrderInvoiceStatus
}
