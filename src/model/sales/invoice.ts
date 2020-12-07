import InvoiceItem from './invoiceItem'

interface Invoice {
  id: number
  code: string
  customer: string
  name: string
  vat: string
  status: string
  total: number
  items: InvoiceItem[]
}

export default Invoice
