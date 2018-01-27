import helpers from '../src/helpers'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

describe('helpers', () => {
  const audioSource = 'http://traffic.libsyn.com/scrummastertoolbox/' +
    '20180126_Kimberley_Miller_F.mp3?_=1'

  describe('getPageAudioSrc', () => {
    const mockHtmlContent = (path) => {
      jest.spyOn(helpers, 'downloadHtml')
        .mockImplementation(() => readFile(path))
    }

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('returns null if no audio tags are found', async () => {
      mockHtmlContent('./spec/example_without_audio.html')
      expect(await helpers.getPageAudioSrc('dummy')).toBeNull()
    })

    it('returns the audio tag src if found', async () => {
      mockHtmlContent('./spec/example_with_audio.html')
      expect(await helpers.getPageAudioSrc('dummy')).toBe(audioSource)
    })
  })

  describe('urlFileName', () => {
    it('returns the name of the file', () => {
      expect(helpers.urlFileName('http://dummy.org/my/long_file_name.mp3?_=1'))
        .toBe('long_file_name.mp3')
    })
  })
})
