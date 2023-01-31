import xmldata from '../data/res.xml?raw'
// https://cn.vitejs.dev/guide/assets.html#importing-asset-as-url

export const mockXml = (_req: any, res: any, ctx: any) => {
  return res(
    ctx.status(200),
    ctx.body(xmldata),
  )
}
