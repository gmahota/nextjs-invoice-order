interface CustomerDocument {
  id: number
  code: string
  customer: string
  name?: string
  reference?: string
  vat?: string
  status?: string
  total: number
}

export default CustomerDocument
