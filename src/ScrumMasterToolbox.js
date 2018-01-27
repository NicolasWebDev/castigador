import inquirer from 'inquirer'
import helpers from './helpers'
import Episode from './Episode'

const url = 'http://scrum-master-toolbox.org/'

export default class ScrumMasterToolbox {
  static async delegateToEpisodes (propertyName) {
    return (await this.episodes()).map(elt => elt[propertyName])
  }

  static async titles () {
    return this.delegateToEpisodes('title')
  }

  static async urls () {
    return this.delegateToEpisodes('url')
  }

  static async promptEpisodes () {
    const choices = (await this.episodes()).map(episode => ({
      name: episode.title,
      value: episode
    }))
    const results = await inquirer.prompt([{
      type: 'checkbox',
      message: 'Choose the episodes you want to download',
      name: 'episodes',
      choices
    }])
    for (let episode of results.episodes) {
      await episode.download()
    }
  }

  static async episodes () {
    return Array.from(
      (await helpers.remoteDocument(url)).querySelectorAll('.entry-title a')
    ).map(elt => new Episode(elt.textContent, elt.href))
  }
}
