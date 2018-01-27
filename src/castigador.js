#! /usr/bin/env node

import 'babel-polyfill'
import ScrumMasterToolbox from '../lib/ScrumMasterToolbox'

(async () => {
  await ScrumMasterToolbox.promptEpisodes()
})()
