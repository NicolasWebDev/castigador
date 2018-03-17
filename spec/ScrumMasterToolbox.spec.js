import ScrumMasterToolbox from '../src/ScrumMasterToolbox'
import helpers from '../src/helpers'
import inquirer from 'inquirer'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

describe('ScrumMasterToolbox', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  const mockHtmlContent = (path) => {
    jest.spyOn(helpers, 'downloadHtml')
      .mockImplementation(() => readFile(path))
  }

  describe('titles', () => {
    it('returns the titles of the first page as a list', async () => {
      mockHtmlContent('./spec/scrum_master_toolbox_home.html')
      expect(await ScrumMasterToolbox.titles()).toEqual([
        '20 TOP Agile Blogs for Scrum Masters that you will not (easily) find on google searches (2017 edition)',
        'Kimberley Miller on how to explore trust as a symptom of systemic trouble',
        'Kimberley Miller on how to use self-assessment to drive team success',
        'Kimberley Miller on using retrospectives to help change organizations',
        'Kimberley Miller on how teams forget quality over deadlines',
        'Kimberley Miller and the Shopping List Anti-pattern in Scrum',
        'BONUS: From Project Manager to Scrum Master, an interview with Tanner Wortham',
        'Christiaan Verwijs shares 4 perspectives that help identify systemic problems',
        'Christiaan Verwijs on why self-organization is the metric for the team’s success',
        'Christiaan Verwijs on how a CEO became a better leader with the help of a Scrum Master',
        'Christiaan Verwijs on facilitation as the critical art for Scrum Masters'
      ])
    })
  })

  describe('urls', () => {
    it('returns the pathnames of the first page as a list', async () => {
      mockHtmlContent('./spec/scrum_master_toolbox_home.html')
      expect(await ScrumMasterToolbox.urls()).toEqual([
        'http://scrum-master-toolbox.org/2017/12/blog/20-top-agile-blogs-for-scrum-masters-that-you-will-not-easily-find-on-google-searches-2017-edition/',
        'http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-on-how-to-explore-trust-as-a-symptom-of-systemic-trouble/',
        'http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-on-how-to-use-self-assessment-to-drive-team-success/',
        'http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-on-using-retrospectives-to-help-change-organizations/',
        'http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-on-how-teams-forget-quality-over-deadlines/',
        'http://scrum-master-toolbox.org/2018/01/podcast/kimberley-miller-and-the-shopping-list-anti-pattern-in-scrum/',
        'http://scrum-master-toolbox.org/2018/01/podcast/bonus-from-project-manager-to-scrum-master-an-interview-with-tanner-wortham/',
        'http://scrum-master-toolbox.org/2018/01/podcast/christiaan-verwijs-shares-4-perspectives-that-help-identify-systemic-problems/',
        'http://scrum-master-toolbox.org/2018/01/podcast/christiaan-verwijs-on-why-self-organization-is-the-metric-for-the-teams-success/',
        'http://scrum-master-toolbox.org/2018/01/podcast/christiaan-verwijs-on-how-a-ceo-became-a-better-leader-with-the-help-of-a-scrum-master/',
        'http://scrum-master-toolbox.org/2018/01/podcast/christiaan-verwijs-on-facilitation-as-the-critical-art-for-scrum-masters/'
      ])
    })
  })

  describe('urlOfPage', () => {
    it('returns the url of the page 2', () => {
      expect(ScrumMasterToolbox.urlOfPage(2))
        .toBe('http://scrum-master-toolbox.org/page/2')
    })

    it('returns the url of the page 3', () => {
      expect(ScrumMasterToolbox.urlOfPage(3))
        .toBe('http://scrum-master-toolbox.org/page/3')
    })
  })

  describe('downloadEpisodes', () => {
    it('calls promptEpisodes once', () => {
      jest.spyOn(ScrumMasterToolbox, 'promptEpisodes').mockReturnValue([])

      ScrumMasterToolbox.downloadEpisodes()

      expect(ScrumMasterToolbox.promptEpisodes).toHaveBeenCalledTimes(1)
    })

    it('calls episode.download once for each episode', async () => {
      const download = jest.fn()
      jest.spyOn(ScrumMasterToolbox, 'promptEpisodes')
        .mockReturnValue(Array(5).fill({ download }))

      await ScrumMasterToolbox.downloadEpisodes()

      expect(download).toHaveBeenCalledTimes(5)
    })
  })

  describe('promptEpisodesChoices', () => {
    it('returns the choices formatted for inquirer', async () => {
      jest.spyOn(ScrumMasterToolbox, 'episodes')
        .mockReturnValue([{ title: 'dog' }, { title: 'cat' }])

      expect(await ScrumMasterToolbox.promptEpisodesChoices()).toEqual([
        {
          name: 'dog',
          value: { title: 'dog' }
        },
        {
          name: 'cat',
          value: { title: 'cat' }
        }
      ])
    })

    it('returns the choices formatted for inquirer (case 2)', async () => {
      jest.spyOn(ScrumMasterToolbox, 'episodes')
        .mockReturnValue([{ title: 'bird' }, { title: 'turtle' }])

      expect(await ScrumMasterToolbox.promptEpisodesChoices()).toEqual([
        {
          name: 'bird',
          value: { title: 'bird' }
        },
        {
          name: 'turtle',
          value: { title: 'turtle' }
        }
      ])
    })
  })

  describe('promptEpisodes', () => {
    beforeEach(() => {
      jest.spyOn(ScrumMasterToolbox, 'promptEpisodesChoices').mockReturnValue()
      jest.spyOn(inquirer, 'prompt').mockReturnValue({})
    })

    it('calls promptEpisodesChoices once', async () => {
      await ScrumMasterToolbox.promptEpisodes('dummy')

      expect(ScrumMasterToolbox.promptEpisodesChoices).toHaveBeenCalledTimes(1)
    })

    it('calls inquirer.prompt once', async () => {
      await ScrumMasterToolbox.promptEpisodes('dummy')

      expect(inquirer.prompt).toHaveBeenCalledTimes(1)
    })

    it('returns the episodes property of inquirer.prompt', async () => {
      inquirer.prompt.mockReturnValue({ episodes: 'expected' })

      const result = await ScrumMasterToolbox.promptEpisodes('dummy')

      expect(result).toBe('expected')
    })
  })
})
