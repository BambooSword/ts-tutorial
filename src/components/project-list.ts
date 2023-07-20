/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
  // project list class

  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[] = []

    constructor(private type: ProjectStatus) {
      super('project-list', 'app', false, `${type}-projects`)
      this.assignedProjects = []

      this.configure()
      this.renderContent()
    }
    configure(): void {
      this.element.addEventListener('dragover', this.dragOverHandler)
      this.element.addEventListener('drop', this.dropHandler)
      this.element.addEventListener('dragleave', this.dragLeaveHandler)
      projectState.addListener((projects: Project[]) => {
        this.assignedProjects = projects.filter(
          item => item.status === this.type
        )
        this.renderProjects()
      })
    }
    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)!
      listEl.innerHTML = ''
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, prjItem)
      }
    }

    renderContent() {
      const listId = `${this.type}-projects-list`
      this.element.querySelector('ul')!.id = listId
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS'
    }

    @autoBind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault()
        const listEl = this.element.querySelector('ul')!
        listEl.classList.add('droppable')
      }
    }

    @autoBind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector('ul')!
      listEl.classList.remove('droppable')
    }

    @autoBind
    dropHandler(event: DragEvent): void {
      console.log('====================================')
      const dragId = event.dataTransfer!.getData('text/plain')

      projectState.moveProject(
        dragId,
        this.type === ProjectStatus.Active
          ? ProjectStatus.Active
          : ProjectStatus.Finished
      )
      console.log(projectState)
      console.log('====================================')
    }
  }
}
