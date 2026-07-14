---
layout: page
---

<script setup>
import { useData } from 'vitepress'
import FlavorPage from '../.vitepress/theme/components/FlavorPage.vue'
import { publishers } from '../.vitepress/data/publishers'

const { params } = useData()
const publisher = publishers.find(p => p.flavor === params.value.flavor)
</script>

<FlavorPage v-if="publisher" :publisher="publisher" />
<div v-else>
  <h1>Publisher Not Found</h1>
  <p>The publisher "{{ params.value.flavor }}" was not found.</p>
  <p><a href="/publishers/">Browse all publishers</a></p>
</div>
