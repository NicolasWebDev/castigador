import ScrumMasterToolbox from '../src/ScrumMasterToolbox'
import helpers from '../src/helpers'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

describe('ScrumMasterToolbox', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  const mockHtmlContent = (path) => {
    jest.spyOn(helpers, 'downloadHtml')
      .mockImplementation(() => {
        console.log('entering here')
        readFile(path)
      })
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
})
