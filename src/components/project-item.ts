/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
  // ProjectItem class
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    get persions() {
      if (this.project.people === 1) {
        return '1 person'
      }
      return `${this.project.people} persons`
    }

    constructor(hostId: string, private project: Project) {
      super('single-project', hostId, false, project.id)

      this.configure()
      this.renderContent()
    }

    configure(): void {
      this.element.addEventListener('dragstart', this.dragStartHandler)
    }

    renderContent(): void {
      this.element.querySelector('h2')!.textContent = this.project.title
      this.element.querySelector('h3')!.textContent =
        this.persions + ' assigned'
      this.element.querySelector('p')!.textContent = this.project.description
    }

    @autoBind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.project.id)
      event.dataTransfer!.effectAllowed = 'move'
    }

    dragEndHandler(_: DragEvent): void {}
  }
}
