import { describe, expect, test } from 'vitest'
import type { episode, podcast } from '../src/utils'
import {
  fixedCoverUrl,
  getEpisode,
  getEpisodeCover,
  getEpisodeCreated,
  getEpisodeDescription,
  getEpisodeTitle,
  getPodcastDescription,
  getPodcastTitle,
} from '../src/utils'
import { data } from './data/rss'

test('getPodcastTitle', () => {
  expect(getPodcastTitle(data as podcast)).toMatchInlineSnapshot('"大内密谈"')
})
test('getPodcastDescription', () => {
  expect(getPodcastDescription(data as podcast)).toMatchInlineSnapshot('"「大内密谈Midnightalks」是一档由“深夜谈谈Midnight Network”出品的播客节目。密而不宣，无所不谈。"')
})
test('getEpisode', () => {
  expect(getEpisode(data as podcast)[0]).toBeTypeOf('object')
})
test('getEpisodeTitle', () => {
  const episode: episode = getEpisode(data as podcast)[0]
  expect(getEpisodeTitle(episode)).toBeTypeOf('string')
})
test('getEpisodeDescription', () => {
  const episode: episode = getEpisode(data as podcast)[0]
  expect(getEpisodeDescription(episode)).toBeTypeOf('string')
})
test('getEpisodeCreated', () => {
  const episode: episode = getEpisode(data as podcast)[0]
  expect(getEpisodeCreated(episode)).toBeTypeOf('number')
})
test('getEpisodeCover', () => {
  const episode: episode = getEpisode(data as podcast)[0]
  expect(getEpisodeCover(episode)).toBeTypeOf('string')
})

describe('fixedCoverUrl', () => {
  const testcase = [
    {
      name: '空',
      url: '',
      expectUrl: '',
    },
    {
      name: '普通',
      url: 'http://cdn.lizhi.fm/audio_cover/2023/01/05/2984336684564983303_80x80.jpg',
      expectUrl: 'https://cdn.lizhi.fm/audio_cover/2023/01/05/2984336684564983303_1000x1000.jpg',
    },
  ]
  testcase.forEach(({
    name,
    url,
    expectUrl,
  }) => {
    test(`${name}`, () => {
      expect(fixedCoverUrl(url)).toEqual(expectUrl)
    })
  })
})
