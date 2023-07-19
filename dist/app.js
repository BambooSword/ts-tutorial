"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />
var App;
(function (App) {
    class StateBase {
        constructor() {
            this.listeners = [];
            this.projects = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends StateBase {
        constructor() {
            super();
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return (this.instance = new ProjectState());
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    const projectState = ProjectState.getInstance();
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (typeof validatableInput.minLength === 'number' &&
            typeof validatableInput.value === 'string') {
            isValid =
                isValid &&
                    validatableInput.value.trim().length >= validatableInput.minLength;
        }
        if (typeof validatableInput.maxLength === 'number' &&
            typeof validatableInput.value === 'string') {
            isValid =
                isValid &&
                    validatableInput.value.trim().length <= validatableInput.maxLength;
        }
        if (typeof validatableInput.value === 'number' &&
            typeof validatableInput.max === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        if (typeof validatableInput.value === 'number' &&
            typeof validatableInput.min === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        return isValid;
    }
    // auto bind decorator
    function autoBind(_, _2, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    // Component Base class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    // ProjectItem class
    class ProjectItem extends Component {
        get persions() {
            if (this.project.people === 1) {
                return '1 person';
            }
            return `${this.project.people} persons`;
        }
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent =
                this.persions + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) { }
    }
    __decorate([
        autoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    // project list class
    class ProjectList extends Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            projectState.addListener((projects) => {
                this.assignedProjects = projects.filter(item => item.status === this.type);
                this.renderProjects();
            });
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul').id, prjItem);
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent =
                this.type.toUpperCase() + ' PROJECTS';
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        dropHandler(event) {
            console.log('====================================');
            const dragId = event.dataTransfer.getData('text/plain');
            projectState.moveProject(dragId, this.type === App.ProjectStatus.Active
                ? App.ProjectStatus.Active
                : App.ProjectStatus.Finished);
            console.log(projectState);
            console.log('====================================');
        }
    }
    __decorate([
        autoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        autoBind
    ], ProjectList.prototype, "dropHandler", null);
    // project input class
    class ProjectInput extends Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            console.log(1);
            this.titleInputElement =
                this.element.querySelector('#title');
            this.descriptionInputElement =
                this.element.querySelector('#description');
            this.peopleInputElement =
                this.element.querySelector('#people');
            this.configure();
            this.attach();
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        gatherInput() {
            const title = this.titleInputElement.value;
            const description = this.descriptionInputElement.value;
            const people = this.peopleInputElement.value;
            const titleValidation = {
                value: title,
                required: true,
                minLength: 1,
            };
            const descriptionValidation = {
                value: description,
                required: true,
                minLength: 1,
            };
            const peopleValidation = {
                value: +people,
                required: true,
                max: 5,
            };
            if (!validate(titleValidation) ||
                !validate(descriptionValidation) ||
                !validate(peopleValidation)) {
                alert('you should fill in all the information');
                return;
            }
            return [title, description, +people];
        }
        clearInput() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }
        submitHandler(event) {
            event.preventDefault();
            const validInput = this.gatherInput();
            if (Array.isArray(validInput)) {
                console.log('🚀 ~ file: app.ts:63 ~ ProjectInput ~ submitHandler ~ validInput:', validInput);
                const [title, desc, people] = validInput;
                projectState.addProject(title, desc, people);
                this.clearInput();
            }
        }
        renderContent() { }
        attach() {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        }
    }
    __decorate([
        autoBind
    ], ProjectInput.prototype, "submitHandler", null);
    const prjInput = new ProjectInput();
    const activePrjList = new ProjectList(App.ProjectStatus.Active);
    const finishedPrjList = new ProjectList(App.ProjectStatus.Finished);
    // finished 9.13
    // next 9.14
    // https://www.bilibili.com/video/BV1MF411T7rn?p=121&spm_id_from=pageDriver&vd_source=eb259cc44017f034cbde32b356136722
})(App || (App = {}));
