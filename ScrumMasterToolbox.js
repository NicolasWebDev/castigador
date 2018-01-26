import { JSDOM } from 'jsdom'
import PodcastDownloader from './PodcastDownloader'

const url = 'http://scrum-master-toolbox.org/'

export default class ScrumMasterToolbox {
  static async titles () {
    return Array.from(
      new JSDOM(await PodcastDownloader.downloadHtml(url))
        .window
        .document
        .querySelectorAll('.entry-title a')
    ).map(elt => elt.textContent)
  }
}
