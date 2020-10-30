import useFetch from '../lib/useFetch'

function getData(data) {
  if (!data || data.errors) return null
  return data.data
}

function getErrorMessage(error, data) {
  if (error) return error.message
  if (data && data.errors) {
    return data.errors[0].message
  }
  return null
}

/**
|--------------------------------------------------
| This GraphQL query returns an array of Order's
| entries complete with both the provided and implicit
| data attributes.
|
| Learn more about GraphQL: https://graphql.org/learn/
|--------------------------------------------------
*/
export const useOrderEntries = () => {
  const query = `query Entries($size: Int) {
    allOrders(_size: $size) {
      data {
        _id
        code
        customer
        name
        vat
        status
        total
        OrderItems:{
          _id
          unity
          quantity
          project
          description
          price
          total
          code
          status
        }
      }
      after
    }
  }`
  const size = 100
  const { data, error } = useFetch(process.env.faunaDbGraphQlEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.faunaDbSecret}`,
      'Content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: { size }
    })
  })

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}
