import { Project } from '../../model/base/project'

const get_ProjectById = async (id: number): Promise<Project> => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + `/api/Projects/${id}`)

    const { code, description, price } = await response.json()
    const data: Project = {
      id,
      code,
      description,
      price
    }
    return data
  } catch (e) {
    throw e
  }
}

const get_Projects: Project[] = async (): Project[] => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + '/api/Projects')

    const list = await response.json()

    return list
  } catch (e) {
    throw e
  }
}
export { get_ProjectById, get_Projects }
