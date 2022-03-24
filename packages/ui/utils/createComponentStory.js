// eslint-disable-next-line import/no-extraneous-dependencies
import dedent from 'dedent'
import _ from 'lodash'

// prettier-ignore
const createComponentStory = (component, {
  args,
  caption,
  controls,
  description,
  subcomponents = {},
  title,
}) => ({
  ...(args && { args }),
  ...(controls && {
    argTypes: _.mapValues(component.propTypes, (value, key) => {
      const control = controls[key] || null
      return {
        control,
      }
    }),
  }),
  component,
  parameters: {
    componentSubtitle: caption,
    docs: {
      description: {
        component: dedent`${description}`,
      },
    },
  },
  subcomponents,
  title: title || `Components/${component.displayName}`,
})

export default createComponentStory
