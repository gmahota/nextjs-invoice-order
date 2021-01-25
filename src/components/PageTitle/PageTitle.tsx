import React from 'react'
import { useRouter } from 'next/router'

type Props = {
  children?: React.ReactNode
}

export default function PageTitle(Props) {
  const router = useRouter()
  const title = router.pathname
  return (
    <>
      <a
        className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
        href="#pablo"
        onClick={e => e.preventDefault()}
      >
        {title}
      </a>
    </>
  )
}
