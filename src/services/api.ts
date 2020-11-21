import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.SERVER_URI
      : `https://${process.env.VERCEL_URL}`
})

export default api
