import React from 'react'
import { useRouter } from 'next/router'

import Product from '../../../model/base/product'

const productList: Product[] = [
  { code: 'A001', description: 'Teste', price: 1000 },
  { code: 'A002', description: 'Teste 2', price: 2000 },
  { code: 'A003', description: 'Teste 2', price: 3000 }
]

export default function ProductDetails() {
  const router = useRouter()

  const id = router.query.id

  const product: Product = productList.find(product => product.code === id)

  if (!product) {
    return <p>Não encontrado</p>
  }

  return (
    <div>
      <p>Produto {product.code}</p>
      <p>Descrição {product.description}</p>
      <p>Preço: {product.price}</p>
    </div>
  )
}
