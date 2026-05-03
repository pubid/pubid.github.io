import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomePage from './components/HomePage.vue'
import FlavorPage from './components/FlavorPage.vue'
import DocTypePage from './components/DocTypePage.vue'
import PublisherGrid from './components/PublisherGrid.vue'
import AnatomyDiagram from './components/AnatomyDiagram.vue'
import Playground from './components/Playground.vue'
import BlogIndex from './components/BlogIndex.vue'
import BlogByline from './components/BlogByline.vue'
import FormatDiagram from './components/FormatDiagram.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('FlavorPage', FlavorPage)
    app.component('DocTypePage', DocTypePage)
    app.component('PublisherGrid', PublisherGrid)
    app.component('AnatomyDiagram', AnatomyDiagram)
    app.component('Playground', Playground)
    app.component('BlogIndex', BlogIndex)
    app.component('BlogByline', BlogByline)
    app.component('FormatDiagram', FormatDiagram)
  },
}
