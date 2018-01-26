import helpers from './helpers'

const url = 'http://scrum-master-toolbox.org/'

export default class ScrumMasterToolbox {
  static async titles () {
    return Array.from(
      (await helpers.remoteDocument(url)).querySelectorAll('.entry-title a')
    ).map(elt => elt.textContent)
  }
}
