import PodcastDownloader from './PodcastDownloader'

export default class Episode {
  constructor (title, url) {
    this.title = title
    this.url = url
  }

  async download () {
    await PodcastDownloader.downloadAudioOnPage(this.url)
  }
}
