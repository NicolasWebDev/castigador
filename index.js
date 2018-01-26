import PodcastDownloader from './PodcastDownloader.js'

(async function () {
  await PodcastDownloader
    .downloadAudioOnPage('http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-on-how-to-explore-trust-as-a-symptom-of-systemic-trouble/')
})()
