import Episode from '../src/Episode'
import helpers from '../src/helpers'

describe('Episode', () => {
  let episode
  let logOutput

  beforeEach(() => {
    episode = new Episode('Scrum secrets', 'http://dummy.org')
  })

  describe('download', () => {
    it('calls helpers.downloadAudioOnPage with the url', async () => {
      jest.spyOn(helpers, 'downloadAudioOnPage').mockReturnValue()

      await episode.download()

      expect(helpers.downloadAudioOnPage)
        .toHaveBeenCalledWith('http://dummy.org')
    })

    it('catches the error if there is one', async () => {
      jest.spyOn(helpers, 'downloadAudioOnPage').mockImplementation(() => {
        throw Error
      })

      await episode.download()
    })
  })
})
