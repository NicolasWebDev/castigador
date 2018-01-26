import fetch from 'node-fetch'
import ProgressBar from 'progress'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import url from 'url'
import path from 'path'

export default class PodcastDownloader {
  static async downloadHtml (givenUrl) {
    return (await fetch(givenUrl)).text()
  }

  static async getPageAudioSrc (givenUrl) {
    const sourceElement = new JSDOM(await this.downloadHtml(givenUrl))
      .window
      .document
      .querySelector('audio source')
    return sourceElement && sourceElement.src
  }

  static urlFileName (givenUrl) {
    return path.basename(url.parse(givenUrl).pathname)
  }

  static async downloadWithProgressBar (fileUrl, destination) {
    const res = await fetch(fileUrl)
    const writeStream = fs.createWriteStream(destination)

    const len = parseInt(res.headers.get('content-length'), 10)
    const bar = new ProgressBar(
      `  downloading ${destination} [:bar] :rate/bps :percent :etas`, {
        incomplete: ' ',
        width: 20,
        total: len
      })

    res.body.on('data', (chunk) => {
      bar.tick(chunk.length)
    })

    res.body.pipe(writeStream)
  }

  static async downloadAudioOnPage (givenUrl) {
    const src = await this.getPageAudioSrc(givenUrl)

    await this.downloadWithProgressBar(src, this.urlFileName(src))
  }
}
