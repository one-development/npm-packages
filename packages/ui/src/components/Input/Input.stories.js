/* eslint-disable max-lines */
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
import Stack from '../Stack'
import Text from '../Text'
import { createIcon } from '../../icons'
import Input from './Input'
import { createComponentStory } from '../../../utils'

const story = createComponentStory(Input, {
  caption: 'Used to elicit a response from a user',
  description: `
    Use an Input component inside of your forms to collect
    feedback from users. Inputs can be controlled or uncontrolled.

    ###### Notes
    * Most common input attributes are supported as props (documented below)
    and passed to the \`<input/>\` element.
    * All \`aria-* \` props are spread into the input element
    * Any additional unrecognized props will be spread into the root element.
    * If you need to provide an unsupported prop to the \`<input/>\` element,
    you can use the \`input\` prop to render an \` <input/>\` with the appropriate attributes.

    ###### Accessibility
    * Always define an \`id\` for Input components
    * Use \`htmlFor\` or \`aria-labelledby\` when label text is visible on screen
    * Use \`aria-label\` when the Input does not have visible label text on screen
    * Use \`aria-describedby\` to associate with other text, like error messages or hints
    * Other attributes, like \`aria-disabled\`, \`aria-invalid\`, and \`aria-required\`, are
    automatically defined based on the appropriate props
    * Do not apply \`aria-hidden\` to focusable elements
    * Typical input masking is problematic for screen readers, so the \`mask\` prop
    is only displayed on blur via a visually hidden text element
  `,
})

export default story

// eslint-disable-next-line react/prop-types
export const Basic = ({ input, ...args }) => (
  <Input id='input-basic' {...args} />
)

// eslint-disable-next-line no-unused-vars
export const WithStates = args => (
  <Stack>
    <Input placeholder='disabled' disabled />
    <Input placeholder='invalid' invalid />
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithMinWidth = args => (
  <Input
    id='input-with-min-width'
    fullWidth={false}
    name='input-with-min-width'
    placeholder='Min width input'
    type='text'
  />
)

const SearchIcon = createIcon(
  <>
    <path key={0} d='M0 0h24v24H0z' fill='none' />
    <path
      key={1}
      d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
    />
  </>,
  'Search'
)

// eslint-disable-next-line no-unused-vars
export const WithAdornments = args => (
  <Stack>
    <Input
      startAdornment={<Text>@</Text>}
      placeholder='Input with a start adornment'
      id='input-with-adornments-start'
      name='input-with-adornments-start'
      type='text'
    />
    <Input
      endAdornment={<Text>.00</Text>}
      placeholder='Input with an end adornment'
      id='input-with-adornments-end'
      name='input-with-adornments-end'
      type='text'
    />
    <Input
      endAdornment={<Text>.00</Text>}
      startAdornment={<Text>$</Text>}
      placeholder='Input with start and end adornments'
      id='input-with-adornments-start-end'
      name='input-with-adornments-start-end'
      type='text'
    />
    <Input
      endAdornment={<SearchIcon />}
      placeholder='Input with icon adornment'
      id='input-with-adornments-icon'
      name='input-with-adornments-icon'
      type='text'
    />
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithMask = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardHeader title='Using Input Masking' />
      <CardContent>
        <Text>
          You can format your Input value on blur via the `mask` prop.
        </Text>
        <Space height='md' />
        <Text variant='caption' color='onSurface.secondary'>
          NOTE: It can be helpful to use the `maxLength` attribute to prevent
          extra characters.
        </Text>
      </CardContent>
      <CardContent>
        <Input
          id='input-with-mask'
          mask='(###) ###-####'
          maxLength='10'
          placeholder='(###) ###-####'
          name='input-with-mask'
          type='tel'
        />
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithPasswords = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardHeader title='Using Password Inputs' />
      <CardContent>
        <Text>
          Input provides built-in logic when you set type=password. A button is
          added to the right side of the input to toggle the masking of the
          current text.
        </Text>
        <Space height='md' />
        <Text variant='caption' color='onSurface.secondary'>
          NOTE: By default, the component will use auto-complete=new-password
          when text is masked and auto-complete=disabled when text is visible.
          You can change that by providing an autoComplete prop.
        </Text>
      </CardContent>
      <CardContent>
        <Input
          id='input-with-passwords'
          name='input-with-passwords'
          type='password'
        />
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ children, ...rest }) => (
  <Box {...rest} paddingTop='sm' color='error'>
    <Text variant='caption'>{children}</Text>
  </Box>
)

export const WithControlledState = () => {
  const [value, setValue] = useState('')
  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <Box padding='lg' maxWidth='420px'>
      <Card>
        <CardHeader title='Adding Extra Attributes' />
        <CardContent>
          <Text>
            You can use inputs as controlled components via value/onChange
          </Text>
        </CardContent>
        <CardContent>
          <Input
            id='input-with-controlled-state'
            input={<input data-test-id='first-name' />}
            name='input-with-controlled-state'
            type='text'
            placeholder='First Name'
            onChange={handleChange}
            value={value}
          />
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
            <Text>
              In this example, an Input is being rendered and controlled with
              external state. This example uses react-hook-form to manage state
              and provide error validation for a few common input types.
            </Text>
            <Space height='lg' />
            <Text variant='caption' color='onSurface.hint'>
              Note: This example uses standalone input components, but they work
              better when used with a{' '}
              <Link href='/?path=/docs/components-formcontrol--basic'>
                Form Control
              </Link>{' '}
              component.
            </Text>
          </CardContent>
          <CardContent>
            <Stack>
              <div>
                <Input
                  name='name'
                  id='name'
                  invalid={Boolean(errors.name)}
                  placeholder='Name'
                  ref={register({ required: 'Name is required' })}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </div>
              <div>
                <Input
                  name='email'
                  id='email'
                  placeholder='Email'
                  invalid={Boolean(errors.email)}
                  ref={register({
                    pattern: {
                      message: 'Email address is invalid',
                      value: /[^@]+@[^.]+\..+/,
                    },
                    required: 'Email is required',
                  })}
                  type='email'
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>
              <div>
                <Input
                  name='phone'
                  id='phone'
                  invalid={Boolean(errors.phone)}
                  mask='(###) ###-####'
                  maxLength='10'
                  placeholder='Phone'
                  ref={register({ required: 'Phone is required' })}
                  type='tel'
                />
                {errors.phone && (
                  <ErrorMessage>{errors.phone.message}</ErrorMessage>
                )}
              </div>
              <div>
                <Input
                  name='password'
                  id='password'
                  invalid={Boolean(errors.password)}
                  placeholder='Password'
                  ref={register({
                    minLength: {
                      message: 'Password must be at least 8 characters',
                      value: 8,
                    },
                    pattern: {
                      message: 'Password must contain at least 1 number',
                      value: /\d/,
                    },
                    required: 'Password is required',
                  })}
                  type='password'
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>
            </Stack>
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
          <Text variant='caption' color='onSurface.secondary'>
            Note: Many form components set noValidate=true. Make sure it is also
            set to false as well.
          </Text>
        </CardContent>
        <CardContent>
          <Input
            id='input-with-browser-validation'
            formNoValidate={false}
            name='email'
            placeholder='Email Address'
            type='email'
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

export const WithCustomAttributes = () => (
  <Box maxWidth='420px'>
    <Card>
      <CardHeader title='Adding Custom Attributes' />
      <CardContent>
        <Text>
          You can add custom HTML attributes to your Input via the `input` prop.
          This may be useful when adding test attributes to inputs.
        </Text>
      </CardContent>
      <CardContent>
        <Input
          id='input-with-custom-attributes'
          input={<input data-test-id='first-name' />}
          name='input-with-custom-attributes'
          type='text'
        />
      </CardContent>
    </Card>
  </Box>
)
