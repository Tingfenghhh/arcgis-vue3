import { createApp } from 'vue'
import App from './App.vue'
import ArcGIS from "../packages"

const app = createApp(App)
app.use(ArcGIS)
app.mount('#app')
