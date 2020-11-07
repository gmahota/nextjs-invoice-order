interface Customer {
  id: number
  code: string
  name: string
  vatNumber: string
  address: string
}

interface CustomerOptions {
  inputValue?: string
  code: string
  name: string
  vat: string
  address: string
}

export type { Customer, CustomerOptions }
