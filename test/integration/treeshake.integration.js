import appUtils from '../fixtures/example-app/utils'

const assertTreeShake = output =>
  output.indexOf('I have a pen') > 0 &&
  output.indexOf('I have an apple') < 0 &&
  output.indexOf('I like pears') < 0 &&
  output.indexOf('I like lemons') < 0 &&
  output.indexOf('I like oranges') < 0 &&
  output.indexOf('I like grapes') < 0

describe('build', () => {
  beforeAll(() => {
    appUtils.setUpFixture()
  })

  afterAll(() => {
    appUtils.teardownFixture()
  })

  it('should be tree-shakeable through Terser when using Webpack.', async () => {
    const output = await appUtils.compileWithWebpack({
      optimization: {
        minimize: true,
        usedExports: true,
      },
    })
    expect(assertTreeShake(output)).toBe(true)
  })

  it('should be tree-shakeable through sideEffects when using Webpack', async () => {
    const output = await appUtils.compileWithWebpack({
      optimization: {
        sideEffects: true,
      },
    })

    expect(assertTreeShake(output)).toBe(true)
  })

  it('should be tree-shakeable when using Rollup', async () => {
    const output = await appUtils.compileWithRollup()

    expect(assertTreeShake(output)).toBe(true)
  })
})
