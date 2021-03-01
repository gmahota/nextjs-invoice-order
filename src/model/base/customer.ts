class Customer {
  id: number
  code: string
  name: string
  vatNumber: string
  address: string
}

class CustomerOptions {
  inputValue?: string
  code: string
  name: string
  vatNumber: string
  address: string
}

export { Customer, CustomerOptions }
