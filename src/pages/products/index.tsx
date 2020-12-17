import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import { InputBase, Link, Toolbar, Typography } from '@material-ui/core'
import Product from '../../model/base/product'

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const productList: Product[] = [
  { code: 'A001', description: 'Teste', price: 1000 },
  { code: 'A002', description: 'Teste 2', price: 2000 },
  { code: 'A003', description: 'Teste 2', price: 3000 }
]

export default function ProductList() {
  return (
    <div>
      <h1>Product's List`</h1>

      <Link href="/products/create">+Create New</Link>

      <table>
        <tr>
          <th>Code</th>
          <th>Description</th>
          <th>Price</th>
        </tr>

        {productList.map(product => (
          <tr key={product.code}>
            <td>
              <Link href={`/products/${product.code}`}>{product.code}</Link>
            </td>
            <td>{product.description}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
