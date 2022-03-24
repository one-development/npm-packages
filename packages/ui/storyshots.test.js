import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import path from 'path'

import { styleSheetSerializer } from 'jest-styled-components/serializer'
import { addSerializer } from 'jest-specific-snapshot'

addSerializer(styleSheetSerializer)

initStoryshots({
  configPath: path.resolve(__dirname, '.storybook'),
  suite: 'Storyshots',
  test: multiSnapshotWithOptions(),
})
