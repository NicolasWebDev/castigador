import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import fs from 'fs'
import ProgressBar from 'progress'

const remoteDocument = async (url) => JSDOM.fragment(await downloadHtml(url))

const downloadHtml = async (givenUrl) => (await fetch(givenUrl)).text()

const downloadWithProgressBar = async (fileUrl, destination) => {
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

export default { remoteDocument, downloadHtml, downloadWithProgressBar }
