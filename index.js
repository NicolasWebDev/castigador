import PodcastDownloader from './src/PodcastDownloader.js'
import ScrumMasterToolbox from './src/ScrumMasterToolbox'

const downloadEpisodeFrom = async (url) => {
  await PodcastDownloader
    .downloadAudioOnPage(url)
}

(async () => {
  await ScrumMasterToolbox.promptEpisodes()
  // downloadEpisodeFrom(process.argv[2])
})()
