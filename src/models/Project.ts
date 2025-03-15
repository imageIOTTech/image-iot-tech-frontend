import ComponentModel from "./Component"

type ProjectModel = {
    id: string,
    name: string,
    image: string,
    style: any, //string - Json
    component: ComponentModel[] //Json
}

export default ProjectModel