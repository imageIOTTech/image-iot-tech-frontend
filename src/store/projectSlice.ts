import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import ComponentModel from "../models/Component";
import ProjectModel from "../models/Project";
import { fetchGetProject } from "../hooks/fetchProject";

type initialStateProps = {
    project: ProjectModel,
    components: ComponentModel[],
    prevComponents: ComponentModel[],
}

const initialState: initialStateProps = {
    project: {
        id: '',
        name: '',
        image: '',
        component: [],
        style: {}
    },
    components: [],
    prevComponents: [],
}

const projectSilce = createSlice({
    name: 'project',
    initialState,
    reducers: {
        resetProject: () => initialState,
        getProject: (state, action) => {

        },
        addProject: (state, action) => {

        },
        addComponent: (state, action: PayloadAction<ComponentModel>) => {
            const component: any = action.payload;
            state.components = [...state.components, component];
        },
        updateStyleComponent: (state, action) => {
            const id = action.payload.id;
            const newStyle = action.payload.style;
            const component: any = state.components.find(item => item.id === id);
            if (component) {
                component.style = newStyle;
            }
        },
        updatePositionComponent: (state, action) => {
            const id = action.payload.id;
            const x = action.payload.x;
            const y = action.payload.y;
            const component: any = state.components.find(item => item.id === id);
            if (component) {
                component.positionX = x;
                component.positionY = y;
            }
        },
        updateValueComponent: (state, action) => {
            const id = action.payload.id;
            const value = action.payload.value;
            console.log(value);
            const component: any = state.components.find(item => item.id === id);
            if (component) {
                component.value = value
            }
        },
        deleteComponent: (state, action) => {
            const id = action.payload.id;
            const component: any = state.components.find(item => item.id === id);
            if (!component) {
                return;
            }
            state.components = state.components.filter(item => item.id != id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetProject.pending, (state) => {
                //Pending
            })
            .addCase(fetchGetProject.fulfilled, (state, action: PayloadAction<ProjectModel>) => {
                //Successfull
                state.project = action.payload
            })
            .addCase(fetchGetProject.rejected, (state) => {
                //Reject
            })
    },
})

export const {
    addComponent,
    updateStyleComponent,
    updatePositionComponent,
    updateValueComponent,
    deleteComponent,
} = projectSilce.actions;
export default projectSilce.reducer;