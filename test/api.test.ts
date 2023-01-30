import { parse as rss2json } from 'rss-to-json'
import { describe, expect, it } from 'vitest'
import { getEpisode } from '../src/utils'

describe('dd', () => {
  it('dd', async () => {
    const CORS_PROXY = 'https://cors-anywhere.zbb.workers.dev/'
    const url = 'https://rss.lizhi.fm/rss/14275.xml'
    expect(getEpisode(await rss2json(CORS_PROXY + url))[0]).toMatchInlineSnapshot()
  }, 300000)
})
