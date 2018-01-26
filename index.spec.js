import PodcastDownloader from './index.js'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

describe('getPageAudioSrc', () => {
  const urlWithoutAudioTag = 'http://www.google.com'
  const urlWithAudioTag = 'http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-on-how-to-explore-trust-as-a-symptom-of-systemic-trouble/'

  const mockHtmlContent = (path) => {
    jest.spyOn(PodcastDownloader, 'downloadHtml')
      .mockImplementation(() => readFile(path))
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns null if no audio tags are found', async () => {
    mockHtmlContent('./example_without_audio.html')
    expect(await PodcastDownloader.getPageAudioSrc(urlWithoutAudioTag))
      .toBeNull()
  })

  it('returns the audio tag src if found', async () => {
    mockHtmlContent('./example_with_audio.html')
    expect(await PodcastDownloader.getPageAudioSrc(urlWithAudioTag))
      .toBe('http://traffic.libsyn.com/scrummastertoolbox/20180126_Kimberley_Miller_F.mp3?_=1')
  })
})
