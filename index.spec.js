import getPageAudioSrc from './index.js'

describe('getPageAudioSrc', () => {
  const exampleUrl = 'http://www.google.com'

  it('returns the audio src attribute', async () => {
    expect(await getPageAudioSrc(exampleUrl)).toBeNull()
  })
})
