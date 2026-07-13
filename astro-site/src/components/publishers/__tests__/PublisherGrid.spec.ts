import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PublisherGrid from '~/components/publishers/PublisherGrid.vue'
import { publishers } from '~/data'

describe('PublisherGrid.vue', () => {
  it('renders a card for every publisher by default', () => {
    const wrapper = mount(PublisherGrid)
    const cards = wrapper.findAll('a[href^="/publishers/"]')
    expect(cards).toHaveLength(publishers.length)
  })

  it('filters by category when a tab is clicked', async () => {
    const wrapper = mount(PublisherGrid)
    const buttons = wrapper.findAll('button')
    const intlBtn = buttons.find(b => b.text().includes('International'))
    expect(intlBtn).toBeDefined()
    await intlBtn!.trigger('click')

    const visibleCards = wrapper.findAll('a[href^="/publishers/"]')
    const intlCount = publishers.filter(p => p.category === 'international').length
    expect(visibleCards).toHaveLength(intlCount)
  })

  it('shows the empty state when search matches nothing', async () => {
    const wrapper = mount(PublisherGrid)
    const input = wrapper.find('input')
    await input.setValue('zzzzzz-no-match-zzzzzz')
    expect(wrapper.text()).toContain('No publishers found')
  })

  it('search matches by name, fullName, and flavor', async () => {
    const wrapper = mount(PublisherGrid)
    const input = wrapper.find('input')

    // By name (unique)
    await input.setValue('ISO')
    expect(wrapper.findAll('a[href^="/publishers/"]')).toHaveLength(1)

    // By fullName (unique)
    await input.setValue('International Organization for Standardization')
    expect(wrapper.findAll('a[href^="/publishers/"]')).toHaveLength(1)

    // By flavor (unique)
    await input.setValue('iala')
    expect(wrapper.findAll('a[href^="/publishers/"]')).toHaveLength(1)
  })
})
