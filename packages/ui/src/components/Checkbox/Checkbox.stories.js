import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Box from '../Box'
import Button from '../Button'
import Card from '../Card'
import CardActions from '../CardActions'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import Link from '../Link'
import Space from '../Space'
import Text from '../Text'
import { createComponentStory } from '../../../utils'
import Checkbox from './Checkbox'

export default createComponentStory(Checkbox, {
  caption: 'Allows the user to select one or more items from a set.',
  description: `
    Use a Checkbox to allow users to turn an option on or off.
    If you have multiple options appearing in a list,
    you can preserve space by using checkboxes instead of on/off switches.
    If you have a single option, avoid using a checkbox and use an on/off switch instead.

    ###### Notes
    * Most common input attributes are supported as props (documented below)
    and passed to the \`< input />\` element.
    * All \`aria-*\` props are spread into the input element
    * Any additional unrecognized props will be spread into the root element.
    * If you need to provide an unsupported prop to the \`< input />\` element,
    you can use the \`input\` prop to render an \`< input />\` with the appropriate attributes.

    ###### Accessibility
    * Always define an \`id\` for Checkbox components
    * Using the \`label\` prop will render text under a \`<label>\` element with the \`htmlFor\` attribute defined
    * Use the \`aria-labelledby\` to associate the Checkbox with text that *can't* be rendered via \`label\`
    * Using the \`description\` prop will render text with an \`aria-describedby\` attribute
    * Use \`aria-describedby\` to associate the Checkbox with text that *can't* be rendered via \`description\`
    * Other attributes, like \`aria-disabled\`, \`aria-invalid\`, and \`aria-required\`, are
    automatically defined based on the appropriate props
    * Do not apply \`aria-hidden\` to focusable elements
  `,
})

// eslint-disable-next-line react/prop-types
export const Basic = ({ input, ...args }) => (
  <Checkbox id='checkbox-basic' {...args} />
)

Basic.args = {
  label: 'Agree with me',
}

// eslint-disable-next-line no-unused-vars
export const WithCustomLabel = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardContent>
        <Checkbox
          id='with-custom-label'
          name='agree'
          label={
            <>
              I agree to the ACME&nbsp;
              <Link href='https://acme.co'>Terms of Use</Link>
              &nbsp;and&nbsp;
              <Link href='https://acme.co'>Privacy Policy</Link>
              &nbsp;.
            </>
          }
        />
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithSettingsLayout = args => (
  <Box maxWidth='420px'>
    <Card>
      <form
        noValidate
        onSubmit={e => {
          e.target.reset()
          e.preventDefault()
        }}
      >
        <CardHeader title='Using a Settings Layout' />
        <CardContent>
          <Text>
            In many applications, it is common to use right-aligned checkboxes
            in a settings menu. You can create a settings style layout by
            setting <code>fullWidth: true</code>
            &nbsp;&nbsp;and <code>labelPosition: start</code>.
          </Text>
        </CardContent>
        <CardContent>
          <Checkbox
            fullWidth={true}
            id='settings-1'
            label='Option 1'
            labelPosition='start'
            name='option1'
          />
          <Checkbox
            fullWidth={true}
            id='settings-2'
            label='Option 2'
            labelPosition='start'
            name='option2'
          />
          <Checkbox
            fullWidth={true}
            id='settings-3'
            label='Option 3'
            labelPosition='start'
            name='option3'
          />
        </CardContent>
        <CardActions>
          <Button fullWidth type='submit'>
            Save Changes
          </Button>
        </CardActions>
      </form>
    </Card>
  </Box>
)

export const WithJSValidation = () => {
  const [buttonText, setButtonText] = useState('Save Changes')
  const { errors, handleSubmit, register, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const delay = ms =>
    new Promise(resolve => {
      setTimeout(resolve, ms)
    })

  const onSubmit = handleSubmit(async data => {
    setButtonText('Saving changes...')
    await delay(1000)
    reset()
    setButtonText('Save Changes')

    // eslint-disable-next-line no-console
    console.log({ data })
  })

  return (
    <Box maxWidth='420px'>
      <Card>
        <form noValidate onSubmit={onSubmit}>
          <CardHeader title='Using JavaScript Validation' />
          <CardContent>
            <Text>
              In this example, a Checkbox component is rendered and controlled
              with external state.
              <br />
              <br />
              <b>Note:</b> this example uses react-hook-form to manage state and
              provide error validation. When the value attribute is omitted,
              react-hook-form provides it as true/false.
            </Text>
          </CardContent>
          <CardContent>
            <Checkbox
              id='basic-checkbox'
              invalid={Boolean(errors.agree)}
              label='Do you agree?'
              name='agree'
              ref={register}
              required={false}
            />
          </CardContent>
          <CardActions>
            <Button fullWidth type='submit'>
              {buttonText}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  )
}

export const WithBrowserValidation = () => (
  <Box maxWidth='420px'>
    <Card>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <CardHeader title='Using Browser Validation' />
        <CardContent>
          <Text>
            You can enable built-in HTML validation by setting
            formNoValidate=false on your Input. Try submitting the input below.
          </Text>
          <Space height='md' />
          <Text
            color='onSurface.secondary'
            variant='caption'
            variantMapping={{ caption: 'span' }}
          >
            Note: Many form components set noValidate=true. Make sure it is also
            set to false as well.
          </Text>
        </CardContent>
        <CardContent>
          <Checkbox
            id='with-html-validation'
            formNoValidate={false}
            label='Do you agree?'
            name='agree'
          />
        </CardContent>
        <CardActions>
          <Button fullWidth type='submit'>
            Save Changes
          </Button>
        </CardActions>
      </form>
    </Card>
  </Box>
)
