import helpers from './helpers'

const url = 'http://scrum-master-toolbox.org/'

export default class ScrumMasterToolbox {
  static async delegateToEpisodes (propertyName) {
    return (await this.episodes()).map(elt => elt[propertyName])
  }

  static async titles () {
    return this.delegateToEpisodes('title')
  }

  static async pathnames () {
    return this.delegateToEpisodes('pathname')
  }

  static async episodes () {
    return Array.from(
      (await helpers.remoteDocument(url)).querySelectorAll('.entry-title a')
    ).map(elt => new Episode(elt.textContent, elt.pathname))
  }
}

class Episode {
  constructor (title, pathname) {
    this.title = title
    this.pathname = pathname
  }
}
