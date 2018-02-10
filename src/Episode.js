import helpers from './helpers'

export default class Episode {
  constructor (title, url) {
    this.title = title
    this.url = url
  }

  async download () {
    try {
      await helpers.downloadAudioOnPage(this.url)
    } catch (error) {
      console.log(`Error downloading "${this.title}": ${error.name}` +
        ` ${error.message}`)
    }
  }
}
