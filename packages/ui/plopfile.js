/* eslint-disable import/no-extraneous-dependencies */
const dedent = require('dedent')

module.exports = plop => {
  plop.setGenerator('component', {
    actions: () => [
      {
        path: 'src/components/index.js',
        template: `export { default as {{pascalCase name}} } from './{{pascalCase name}}'`,
        type: 'append',
      },
      {
        path: 'src/components/{{pascalCase name}}/index.js',
        template: dedent`
        export { default } from './{{pascalCase name}}'
      `,
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
        template: dedent`
        import PropTypes from 'prop-types'
        import React, { forwardRef } from 'react'
        import styled from 'styled-components'
        import styleResets from '../utils/styleResets'

        const Root = styled.div(styleResets)
        
        /**
         * Use {{pascalCase name}} to...[insert component guidelines here].
         */
        const {{pascalCase name}} = forwardRef((props, ref) => {
          const { as, className, ...rest } = props
          return (
            <Root
              {...rest}
              as={as}
              className={className}
              ref={ref}
            />
          )
        })

        {{pascalCase name}}.displayName = '{{pascalCase name}}'
        {{pascalCase name}}.defaultProps = {
          as: 'div',
        }
        {{pascalCase name}}.propTypes = {
         /**
          * The component used for the root node
          * (either a string to use as DOM element or a React component)
          */
          as: PropTypes.elementType,
          className: PropTypes.string,
        }

        export default {{pascalCase name}}
      `,
        type: 'add',
      },
      {
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.js',
        template: dedent`
        import React from 'react'
        import {{pascalCase name}} from './{{pascalCase name}}'

        const story = {
          parameters: {
            component: {{pascalCase name}},
            componentSubtitle: '[insert component subtitle here]',
          },
          title: 'Components/{{pascalCase name}}',
        }

        export default story
        export const Basic = () => (
          <{{pascalCase name}}/>
        )
      `,
        type: 'add',
      },
    ],
    description: 'Creates a new component in the components directory',
    prompts: [
      {
        message: 'Component name',
        name: 'name',
        type: 'input',
      },
    ],
  })
}
