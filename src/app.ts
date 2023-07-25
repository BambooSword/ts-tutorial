import { ProjectInput } from './components/project-input'
import { ProjectList } from './components/project-list'
import { ProjectStatus } from './models/project'

const prjInput = new ProjectInput()
const activePrjList = new ProjectList(ProjectStatus.Active)
const finishedPrjList = new ProjectList(ProjectStatus.Finished)
