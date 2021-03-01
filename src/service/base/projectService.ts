import { Project } from '../../model/base/project'
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const get_ProjectById = async (id: number): Promise<Project> => {
  try {
    const response = await fetch(
      `${publicRuntimeConfig.SERVER_URI}base/Projects/${id}`
    )

    const { code, description, status } = await response.json()
    const data: Project = {
      id,
      code,
      description,
      status
    }
    return data
  } catch (e) {
    throw e
  }
}

const get_Projects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(
      `${publicRuntimeConfig.SERVER_URI}base/Projects/`
    )

    const list = await response.json()

    return list
  } catch (e) {
    throw e
  }
}
export { get_ProjectById, get_Projects }
