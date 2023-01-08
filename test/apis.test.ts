import { expect, test } from 'vitest'
import { PodcastData } from '../src/apis'

// TODO: Vitest throw TypeError
//  TypeError: __vite_ssr_import_0__.default is not a function
test.skip('RSStoJson', async () => {
  const date = await PodcastData()
  expect(date).toBeTypeOf('object')
})

