import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'

import './assets/tokens.css'
import './assets/base.css'
import './assets/luxury.css'
import './assets/workflow.css'

import AppIcon from './components/ui/AppIcon.vue'
import AppButton from './components/ui/AppButton.vue'
import AppCard from './components/ui/AppCard.vue'
import StatusBadge from './components/ui/StatusBadge.vue'
import WfStepper from './components/ui/WfStepper.vue'

const app = createApp(App)

app.component('AppIcon', AppIcon)
app.component('AppButton', AppButton)
app.component('AppCard', AppCard)
app.component('StatusBadge', StatusBadge)
app.component('WfStepper', WfStepper)

app.use(createPinia())
app.use(router)
app.mount('#app')
