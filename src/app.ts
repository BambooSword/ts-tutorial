// Drag & Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

// Project type
enum ProjectStatus {
  Active = 'active',
  Finished = 'finished',
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project State Management
type Listener<T> = (items: T[]) => void

class StateBase<T> {
  protected listeners: Listener<Project>[] = []
  protected projects: T[] = []
  constructor() {}
  addListener(listenerFn: Listener<Project>) {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends StateBase<Project> {
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

const projectState = ProjectState.getInstance()

// Validation
interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(validatableInput: Validatable) {
  let isValid = true
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (
    typeof validatableInput.minLength === 'number' &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length >= validatableInput.minLength
  }
  if (
    typeof validatableInput.maxLength === 'number' &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length <= validatableInput.maxLength
  }
  if (
    typeof validatableInput.value === 'number' &&
    typeof validatableInput.max === 'number'
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  if (
    typeof validatableInput.value === 'number' &&
    typeof validatableInput.min === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  return isValid
}

// auto bind decorator
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
  return adjDescriptor
}

// Component Base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U
  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId)! as T
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if (newElementId) {
      this.element.id = newElementId
    }

    this.attach(insertAtStart)
  }

  protected attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    )
  }
  abstract configure(): void
  abstract renderContent(): void
}

// ProjectItem class
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  get persons() {
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
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }

  @autoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_: DragEvent): void {}
}

// project list class

class ProjectList
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
      this.assignedProjects = projects.filter(item => item.status === this.type)
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

// project input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')
    console.log(1)
    this.titleInputElement =
      this.element.querySelector<HTMLInputElement>('#title')!
    this.descriptionInputElement =
      this.element.querySelector<HTMLInputElement>('#description')!
    this.peopleInputElement =
      this.element.querySelector<HTMLInputElement>('#people')!

    this.configure()
    this.attach()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }
  private gatherInput(): [string, string, number] | undefined {
    const title = this.titleInputElement.value
    const description = this.descriptionInputElement.value
    const people = this.peopleInputElement.value

    const titleValidation: Validatable = {
      value: title,
      required: true,
      minLength: 1,
    }
    const descriptionValidation: Validatable = {
      value: description,
      required: true,
      minLength: 1,
    }
    const peopleValidation: Validatable = {
      value: +people,
      required: true,
      max: 5,
    }
    if (
      !validate(titleValidation) ||
      !validate(descriptionValidation) ||
      !validate(peopleValidation)
    ) {
      alert('you should fill in all the information')
      return
    }
    return [title, description, +people]
  }

  private clearInput() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault()
    const validInput = this.gatherInput()
    if (Array.isArray(validInput)) {
      console.log(
        '🚀 ~ file: app.ts:63 ~ ProjectInput ~ submitHandler ~ validInput:',
        validInput
      )
      const [title, desc, people] = validInput
      projectState.addProject(title, desc, people)
      this.clearInput()
    }
  }

  renderContent(): void {}

  attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList(ProjectStatus.Active)
const finishedPrjList = new ProjectList(ProjectStatus.Finished)

// finished 9.13
// next 9.14
// https://www.bilibili.com/video/BV1MF411T7rn?p=121&spm_id_from=pageDriver&vd_source=eb259cc44017f034cbde32b356136722

// 冒泡排序

const bubbleSort = (arr: number[]) => {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let flag = false
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = true
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    if (!flag) break
  }
  return arr
}

// 堆排序

const heapify = (arr: number[], i: number, len: number) => {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < len && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, largest, len)
  }
}

/**
 * Sorts an array of numbers using the Heap Sort algorithm.
 *
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array.
 */
const heapSort = (arr: number[]) => {
  const len = arr.length
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len)
  }
  for (let i = len - 1; i >= 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    heapify(arr, 0, i)
  }
  return arr
}
