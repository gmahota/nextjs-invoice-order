interface SalesItem {
  id: number
  code: string
  description: string
  unity: string
  quantity: number
  price: number
  grossTotal: number
  vatTotal: number
  total: number
  status?: string
  project?: string
  vatCode?: string
}

export default SalesItem
