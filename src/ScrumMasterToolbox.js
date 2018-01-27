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

  static async downloadEpisodes () {
    const episodes = await this.promptEpisodes()
    for (let episode of episodes) {
      await episode.download()
    }
  }

  static async promptEpisodes () {
    const choices = (await this.episodes()).map(episode => ({
      name: episode.title,
      value: episode
    }))
    const result = await inquirer.prompt([{
      type: 'checkbox',
      message: 'Choose the episodes you want to download',
      name: 'episodes',
      choices
    }])
    return result.episodes
  }

  static async episodes () {
    return Array.from(
      (await helpers.remoteDocument(url)).querySelectorAll('.entry-title a')
    ).map(elt => new Episode(elt.textContent, elt.href))
  }
}
