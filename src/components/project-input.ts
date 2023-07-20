/// <reference path="./base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../utils/validation.ts" />


namespace App {
  // project input class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
