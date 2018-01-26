import PodcastDownloader from './PodcastDownloader.js'

const downloadEpisodeFrom = async (url) => {
  await PodcastDownloader
    .downloadAudioOnPage(url)
}

(async () => {
  downloadEpisodeFrom(process.argv[2])
})()
