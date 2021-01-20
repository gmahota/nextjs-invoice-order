import React from 'react'
import { AppProps } from 'next/app'
import { Layout } from './../components/Layout/Layout'
import 'moment-timezone'

import 'tailwindcss/tailwind.css'
import '../styles/global.css'

import '@fortawesome/fontawesome-free/css/all.min.css'
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
      {/*
      Tailwind's normalize isn't applied
      thus 8px margin is added around "body".
      Fix it with a global style.
      https://github.com/zeit/next.js/issues/151#issuecomment-257090939 */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}

export default MyApp
