import PodcastDownloader from './PodcastDownloader.js'
import ScrumMasterToolbox from './ScrumMasterToolbox'

const downloadEpisodeFrom = async (url) => {
  await PodcastDownloader
    .downloadAudioOnPage(url)
}

(async () => {
  await ScrumMasterToolbox.promptEpisodes()
  // downloadEpisodeFrom(process.argv[2])
})()
