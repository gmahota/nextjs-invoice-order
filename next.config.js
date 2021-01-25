module.exports = {
    serverRuntimeConfig: {
      // Will only be available on the server side
      mySecret: 'secret',
      SERVER_URI: process.env.SERVER_URI, // Pass through env variables
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      SERVER_URI: process.env.SERVER_URI,
    },
  }