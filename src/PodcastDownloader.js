import helpers from './helpers'
import { JSDOM } from 'jsdom'
import url from 'url'
import path from 'path'

export default class PodcastDownloader {
  static async getPageAudioSrc (givenUrl) {
    const sourceElement = JSDOM.fragment(await helpers.downloadHtml(givenUrl))
      .querySelector('audio source')
    return sourceElement && sourceElement.src
  }

  static urlFileName (givenUrl) {
    return path.basename(url.parse(givenUrl).pathname)
  }

  static async downloadAudioOnPage (givenUrl) {
    const src = await this.getPageAudioSrc(givenUrl)

    const result = await helpers.downloadWithProgressBar(src, this.urlFileName(src))
    console.log(result)
  }
}
