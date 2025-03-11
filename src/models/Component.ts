import ImageEditModel from "./ImageEdit"
import StrokeEditModel from "./StrokeEdit"
import TextEditModel from "./TextEdit"

type ComponentModel = {
    id: string, 
    type: string, //Image - Text - Stroke
    component: StrokeEditModel | ImageEditModel | TextEditModel,
    style: any,
}

export default ComponentModel