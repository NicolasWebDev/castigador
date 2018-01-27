import { JSDOM } from 'jsdom'
import { parse } from 'url'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs'
import ProgressBar from 'progress'

export default class Helpers {
  static async getPageAudioSrc (givenUrl) {
    let element = (await this.remoteDocument(givenUrl))
      .querySelector('audio')
    if (element && !element.src) element = element.querySelector('source')
    return element && element.src
  }

  static async downloadAudioOnPage (givenUrl) {
    const src = await this.getPageAudioSrc(givenUrl)
    await this.downloadWithProgressBar(src, this.urlFileName(src))
  }

  static urlFileName (givenUrl) {
    return path.basename(parse(givenUrl).pathname)
  }

  static async remoteDocument (url) {
    return JSDOM.fragment(await this.downloadHtml(url))
  }

  static async downloadHtml (givenUrl) {
    return (await fetch(givenUrl)).text()
  }

  static async downloadWithProgressBar (fileUrl, destination) {
    const res = await fetch(fileUrl)
    const writeStream = fs.createWriteStream(destination)

    const len = parseInt(res.headers.get('content-length'), 10)
    const bar = new ProgressBar(
      `  downloading ${destination} [:bar] :rate/bps :percent :etas`, {
        incomplete: ' ',
        width: 20,
        total: len,
        head: '>',
        renderThrottle: 50
      })

    return new Promise((resolve) => {
      res.body
        .on('data', (chunk) => {
          bar.tick(chunk.length)
        })
        .on('end', () => {
          resolve()
        })
        .pipe(writeStream)
    })
  }
}
