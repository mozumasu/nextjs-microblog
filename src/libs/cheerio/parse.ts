import cheerio from 'cheerio'
import hljs from 'highlight.js'

export const parseBlogBody = async (contents: string): Promise<string> => {
  const $ = cheerio.load(contents)
  // コードブロックをパースする
  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text())
    $(element).html(result.value)
    $(element).addClass('hljs')
  })

  return $.html()
}
