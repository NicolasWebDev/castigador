import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

const downloadHtml = async (url) => (await fetch(url)).text()

const getPageAudioSrc = async (url) => {
  const { document } = (new JSDOM(await downloadHtml(url))).window
  console.log(document)
  return null
}

export default getPageAudioSrc
