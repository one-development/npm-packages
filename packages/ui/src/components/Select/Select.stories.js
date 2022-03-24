import _ from 'lodash'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Box from '../Box'
import Button from '../Button'
import Card from '../Card'
import CardActions from '../CardActions'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import FormControl from '../FormControl'
import Link from '../Link'
import Space from '../Space'
import Stack from '../Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'
import Select from './Select'

export default createComponentStory(Select, {
  caption: 'Allows a user to select a value from a series of options',
  description: `
    Use a Select component inside of your forms. It can be controlled or uncontrolled.

    ###### Notes
    * Most common select attributes are supported as props (documented below)
    and passed to the \`<select>\` element.
    * All \`aria-*\` props are spread into the \`<select>\` element
    * Any unrecognized prop types will be spread into the root element.
    * If you need to provide an unsupported prop to the \`<select>\` element,
    you can use the \`select\` prop to render an \`<select>\` with the appropriate attributes.

    ###### Accessibility
    * Always define an \`id\` for Select components
    * Use \`htmlFor\` or \`aria-labelledby\` when label text is visible on screen
    * Use \`aria-label\` when the Select does not have visible label text on screen
    * Use \`aria-describedby\` to associate with other text, like error messages or hints
    * Other attributes, like \`aria-disabled\`, \`aria-invalid\`, and \`aria-required\`, are
    automatically defined based on the appropriate props
    * Do not apply \`aria-hidden\` to focusable elements
  `,
})

// eslint-disable-next-line react/prop-types
export const Basic = ({ select, ...args }) => (
  <Select id='select-basic' {...args}>
    <option value='one'>One</option>
    <option value='two'>Two</option>
  </Select>
)

// eslint-disable-next-line no-unused-vars
export const WithStates = args => (
  <Stack>
    <Select id='sws-disabled' disabled>
      <option selected value='disabled'>
        Disabled
      </option>
    </Select>
    <Select id='sws-invalid' invalid>
      <option selected value='invalid'>
        Invalid
      </option>
      <option value='still-invalid'>Still Invalid</option>
    </Select>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithPlaceholder = args => (
  <Select id='swp-number' placeholder='-- select a number --'>
    <option value='one'>One</option>
    <option value='one'>Two</option>
  </Select>
)
// eslint-disable-next-line no-unused-vars
export const WithMinWidth = args => (
  <Select id='swmw-number' fullWidth={false}>
    <option value='one'>One</option>
    <option value='two'>Two</option>
  </Select>
)

export const WithCustomAttributes = () => (
  <Box maxWidth='420px'>
    <Card>
      <CardContent>
        <Text>
          This select is adding custom data attributes for test automation
        </Text>
        <Space height='lg' />
        <Select
          id='swca-color'
          name='color'
          placeholder='--select a color--'
          select={<select data-test-id='color'></select>}
        >
          <option value='red'>Red</option>
          <option value='green'>Green</option>
          <option value='blue'>Blue</option>
        </Select>
      </CardContent>
    </Card>
  </Box>
)

export const WithControlledState = () => {
  const [value, setValue] = useState('red')
  const handleChange = e => {
    if (e && e.target) {
      setValue(e.target.value)
    }
  }

  return (
    <Box maxWidth='420px'>
      <Card>
        <CardHeader title='Controlled Usage' />
        <CardContent>
          <Text>
            Selects can be used as controlled components with React state. This
            is useful when you are using a Select outside of form.
          </Text>
        </CardContent>
        <CardContent>
          <Text as='label' variant='label' htmlFor='swcs-color'>
            Controlled Select
          </Text>
          <Space height='sm' />
          <Select
            id='swcs-color'
            value={value}
            onChange={handleChange}
            placeholder='-- select a color --'
            name='color'
          >
            <option value='red' label='Red' />
            <option value='blue' label='Blue' />
            <option value='green' label='Green' />
          </Select>
        </CardContent>
      </Card>
    </Box>
  )
}

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

  const onSubmit = async data => {
    setButtonText('Saving changes...')
    await delay(1000)
    reset()
    setButtonText('Save Changes')

    // eslint-disable-next-line no-console
    console.log({ data })
  }

  return (
    <Box maxWidth='420px'>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardHeader title='Using JavaScript Validation' />
          <CardContent>
            <Stack>
              <Text>
                In this example, a Select and Inputs are being rendered and
                controlled with external state. This example uses
                react-hook-form to manage state and provide error validation.
              </Text>
              <Text variant='caption' color='onSurface.secondary'>
                Note: this example uses the <Link href>FormControl</Link>{' '}
                component to manage labels and error messages
              </Text>
            </Stack>
          </CardContent>
          <CardContent>
            <FormControl
              error={_.get(errors, 'plan-type.message')}
              label='Plan Type'
            >
              <Select
                name='plan-type'
                id='swjsv-plan-type'
                placeholder='-- select a plan --'
                ref={register({ required: 'You must select a plan' })}
              >
                <option value={1}>Free</option>
                <option value={2}>Pro ($0.99/month)</option>
              </Select>
            </FormControl>
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

// eslint-disable-next-line no-unused-vars
export const WithBrowserValidation = args => (
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
            formNoValidate=false on your Select. Try submitting the form below.
          </Text>
          <Space height='md' />
          <Text variant='caption' color='onSurface.secondary'>
            Note: Many form components set noValidate=true. Make sure it is also
            set to false on your form.
          </Text>
        </CardContent>
        <CardContent>
          <Text as='label' variant='label' htmlFor='swbv-plan-type'>
            Plan Type
          </Text>
          <Space height='sm' />
          <Select
            formNoValidate={false}
            id='swbv-plan-type'
            name='plan-type'
            placeholder='-- select a plan --'
          >
            <option value={1}>Free</option>
            <option value={2}>Pro ($0.99/month)</option>
          </Select>
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
