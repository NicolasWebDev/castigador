import PodcastDownloader from './PodcastDownloader.js'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

describe('PodcastDownloader', () => {
  const audioSource = 'http://traffic.libsyn.com/scrummastertoolbox/' +
    '20180126_Kimberley_Miller_F.mp3?_=1'

  describe('getPageAudioSrc', () => {
    const mockHtmlContent = (path) => {
      jest.spyOn(PodcastDownloader, 'downloadHtml')
        .mockImplementation(() => readFile(path))
    }

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('returns null if no audio tags are found', async () => {
      mockHtmlContent('./example_without_audio.html')
      expect(await PodcastDownloader.getPageAudioSrc('dummy')).toBeNull()
    })

    it('returns the audio tag src if found', async () => {
      mockHtmlContent('./example_with_audio.html')
      expect(await PodcastDownloader.getPageAudioSrc('dummy')).toBe(audioSource)
    })
  })

  describe('urlFileName', () => {
    it('returns the name of the file', () => {
      expect(PodcastDownloader.urlFileName(audioSource))
        .toBe('20180126_Kimberley_Miller_F.mp3')
    })
  })
})
