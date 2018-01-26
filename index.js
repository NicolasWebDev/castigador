import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

export default class PodcastDownloader {
  static async downloadHtml (url) {
    return (await fetch(url)).text()
  }

  static async getPageAudioSrc (url) {
    const sourceElement = new JSDOM(await this.downloadHtml(url))
      .window
      .document
      .querySelector('audio source')
    return sourceElement && sourceElement.src
  }
}
