import { URL } from 'url'
import inquirer from 'inquirer'
import helpers from './helpers'
import Episode from './Episode'

const domain = 'http://scrum-master-toolbox.org/'

export default class ScrumMasterToolbox {
  static async delegateToEpisodes (propertyName) {
    return (await this.episodes(domain)).map(elt => elt[propertyName])
  }

  static async titles () {
    return this.delegateToEpisodes('title')
  }

  static async urls () {
    return this.delegateToEpisodes('url')
  }

  static urlOfPage (pageNumber) {
    return new URL(`/page/${pageNumber}`, domain).href
  }

  static async downloadEpisodes () {
    const episodes = (await this.promptEpisodes(domain))
    for (let episode of episodes) await episode.download()
  }

  static async promptEpisodesChoices (url) {
    return (await this.episodes(url)).map(episode => ({
      name: episode.title,
      value: episode
    }))
  }

  static async promptEpisodes (url) {
    const result = await inquirer.prompt([{
      type: 'checkbox',
      message: 'Choose the episodes you want to download',
      name: 'episodes',
      choices: (await this.promptEpisodesChoices(url))
    }])
    return result.episodes
  }

  static async episodes (url) {
    return Array.from(
      (await helpers.remoteDocument(url)).querySelectorAll('.entry-title a')
    ).map(elt => new Episode(elt.textContent, elt.href))
  }
}
