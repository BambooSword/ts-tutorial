/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./models/project.ts" />

namespace App {
  const prjInput = new ProjectInput()
  const activePrjList = new ProjectList(ProjectStatus.Active)
  const finishedPrjList = new ProjectList(ProjectStatus.Finished)

  // finished 9.13
  // next 9.14
  // https://www.bilibili.com/video/BV1MF411T7rn?p=121&spm_id_from=pageDriver&vd_source=eb259cc44017f034cbde32b356136722
}
