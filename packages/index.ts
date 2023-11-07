import type { App, Component } from 'vue'
import TArcGis from "./arcgis/components";




const components: {
    [propName: string]: Component
} = { TArcGis };

// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App) => {
    for (const key in components) {
        app.component(key, components[key])
    }
}
// vue插件
const install: any = (app: any) => {
    installComponents(app)
}
export default {
    install
};
