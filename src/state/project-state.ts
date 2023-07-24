// Project State Management
import { Project, ProjectStatus } from '../models/project.js'
type Listener<T> = (items: T[]) => void

class StateBase<T> {
  protected listeners: Listener<Project>[] = []
  protected projects: T[] = []
  constructor() {}
  addListener(listenerFn: Listener<Project>) {
    this.listeners.push(listenerFn)
  }
}

export class ProjectState extends StateBase<Project> {
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }

    return (this.instance = new ProjectState())
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    )
    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
    }
  }
}

// only run once, will not run twice when there are mutations imports
export const projectState = ProjectState.getInstance()
