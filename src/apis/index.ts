/**
 * 测试各种不同的 parser 库，尝试找到最合适的那个
 *
 *  https://rss.lizhi.fm/rss/14275.xml
 *
 * - [x] rss-to-json  -> ok
 * - [ ] rss-parser
 * - [ ] feedparser
 * - [ ] htmlparser2
 * - [ ] fast-xml-parser
 */
import Parse from 'rss-to-json'

export async function PodcastData() {
  try {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://rss.lizhi.fm/rss/14275.xml'
    return await Parse(CORS_PROXY + url)
  }
  catch (e) {
    console.error(e)
  }
}

