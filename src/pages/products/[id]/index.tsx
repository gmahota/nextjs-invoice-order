import React from 'react'
import { useRouter } from 'next/router'

import { Product } from '../../../model/base/product'

export default function ProductDetails() {
  const router = useRouter()

  const id = router.query.id

  return <div></div>
}
