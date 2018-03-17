import helpers from '../src/helpers'
import util from 'util'
import fs from 'fs'
jest.mock('progress')
jest.mock('node-fetch')
// eslint-disable-next-line
import fetch from 'node-fetch'
const readFile = util.promisify(fs.readFile)

const mockOn = (object, methodName) => jest.spyOn(object, methodName)
  .mockReturnValue()

describe('helpers', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

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

  describe('downloadHtml', () => {
    it('returns the text method of fetch', async () => {
      fetch.mockReturnValue({ text: jest.fn().mockReturnValue('coucou') })

      expect(await helpers.downloadHtml()).toBe('coucou')
    })

    it('passes its parameter to fetch', async () => {
      await helpers.downloadHtml('dummy')

      expect(fetch).toHaveBeenCalledWith('dummy')
    })
  })

  describe('downloadAudioOnPage', () => {
    beforeEach(() => {
      mockOn(helpers, 'getPageAudioSrc').mockReturnValue('dummy1')
      mockOn(helpers, 'downloadWithProgressBar').mockReturnValue('dummy2')
      mockOn(helpers, 'urlFileName').mockReturnValue('dummy3')
    })

    it('calls getPageAudioSrc', async () => {
      await helpers.downloadAudioOnPage()

      expect(helpers.getPageAudioSrc).toHaveBeenCalledTimes(1)
    })

    it('calls downloadWithProgressBar with the url and the file name',
      async () => {
        await helpers.downloadAudioOnPage()

        expect(helpers.downloadWithProgressBar)
          .toHaveBeenCalledWith('dummy1', 'dummy3')
      })
  })

  describe('downloadWithProgressBar', () => {
    it('calls fetch with the firt parameter', async () => {
      fetch.mockReturnValue({
        headers: {
          get: jest.fn()
        }
      })
      mockOn(helpers, 'writeResponseBody')

      await helpers.downloadWithProgressBar('dummy1', 'dummy2')

      expect(fetch).toHaveBeenCalledWith('dummy1')
    })
  })
})
