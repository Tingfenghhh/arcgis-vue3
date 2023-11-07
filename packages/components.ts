import TArcGis from "./arcgis/components"

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        TArcGis: typeof TArcGis
    }
}