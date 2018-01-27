import helpers from './helpers'

export default class Episode {
  constructor (title, url) {
    this.title = title
    this.url = url
  }

  async download () {
    await helpers.downloadAudioOnPage(this.url)
  }
}
