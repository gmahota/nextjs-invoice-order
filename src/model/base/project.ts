class Project {
  id: number
  code: string
  description: string
  status?: string
}

class ProjectOptions {
  inputValue?: string
  code: string
  description: string
}

export { Project, ProjectOptions }
