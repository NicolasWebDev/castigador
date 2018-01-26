import ScrumMasterToolbox from '../ScrumMasterToolbox'
import helpers from '../helpers'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

describe('ScrumMasterToolbox', () => {
  describe('titles', () => {
    const mockHtmlContent = (path) => {
      jest.spyOn(helpers, 'downloadHtml')
        .mockImplementation(() => readFile(path))
    }

    it('returns the titles of the first page as a list', async () => {
      mockHtmlContent('./specs/scrum_master_toolbox_home.html')
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
})
