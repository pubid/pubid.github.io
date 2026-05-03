---
layout: page
---

<script setup>
import { useData } from 'vitepress'
import DocTypePage from '../../.vitepress/theme/components/DocTypePage.vue'
import { publishers } from '../../.vitepress/data/publishers'

const { params } = useData()
const publisher = publishers.find(p => p.flavor === params.value.flavor)
const docType = publisher?.docTypes.find(dt => dt.key === params.value.type)
</script>

<DocTypePage v-if="publisher && docType" :publisher="publisher" :docType="docType" />
<div v-else>
  <h1>Not Found</h1>
  <p v-if="publisher">The document type "{{ params.value.type }}" was not found for {{ publisher.name }}.</p>
  <p v-else>The publisher "{{ params.value.flavor }}" was not found.</p>
  <p><a href="/publishers/">Browse all publishers</a></p>
</div>
