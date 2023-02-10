import { rest } from 'msw'
import { mockXml } from './resolvers/mockXml'

export const handlers = [
  rest.get('https://cors-anywhere.dev.imzbb.cc/https%3A%2F%2Frss.lizhi.fm%2Frss%2F14275.xml', mockXml),
  // error
  // rest.get('https://cors-anywhere.dev.imzbb.cc/https%3A%2F%2Frss.lizhi.fm%2Frss%2F14275.xml', (req, res, ctx) => {
  //   return res(
  //     ctx.status(500),
  //     ctx.json({
  //       error: 'Internal Server Error',
  //     }),
  //   )
  // }),
]
