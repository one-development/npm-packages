import React from 'react'
import { useForm } from 'react-hook-form'
import Radio from './Radio'
import Box from '../Box'
import Button from '../Button'
import Card from '../Card'
import CardActions from '../CardActions'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import Icon from '../Icon'
import Link from '../Link'
import Notification from '../Notification'
import Space from '../Space'
import Stack from '../Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Radio, {
  caption: 'Allows a user to select one value from a set of options',
  description: `
    Use a Radio inside of a [RadioGroup](/?path=/docs/components-radiogroup--basic)
    or as a standalone component for special use cases.

    ###### Notes
    * Most common input attributes are supported as props (documented below)
    and passed to the \`<input/>\` element.
    * All \`aria-*\` props are spread into the input element
    * Any additional unrecognized props will be spread into the root element.
    * If you need to provide an unsupported prop to the \`<input/>\` element,
    you can use the \`input\` prop to render an \`<input/>\` with the appropriate attributes.

    ###### Accessibility
    * Always define an \`id\` for Radio components
    * Using the \`label\` prop will render text under a \`<label>\` element with the \`htmlFor\` attribute defined
    * Use the \`aria-labelledby\` to associate the Radio with text that *can't* be rendered via \`label\`
    * Using the \`description\` prop will render text with an \`aria-describedby\` attribute
    * Use \`aria-describedby\` to associate the Radio with text that *can't* be rendered via \`description\`
    * Other attributes, like \`aria-disabled\`, \`aria-invalid\`, and \`aria-required\`, are
    automatically defined based on the appropriate props
    * Do not apply \`aria-hidden\` to focusable elements
  `,
})

// eslint-disable-next-line react/prop-types
export const Basic = ({ input, ...args }) => (
  <Radio id='radio-basic' {...args} />
)

Basic.args = {
  label: 'Select this option',
}

// eslint-disable-next-line no-unused-vars
export const WithStates = args => (
  <Stack space='0px'>
    <Radio
      id='radio-with-states-unchecked'
      label='Unchecked Radio'
      name='radio-with-states-unchecked'
      value='unchecked'
    />
    <Radio
      checked
      id='radio-with-states-checked'
      label='Checked Radio'
      name='radio-with-states-checked'
      value='checked'
    />
    <Radio
      disabled
      id='radio-with-states-disabled'
      label='Disabled Radio'
      name='radio-with-states'
      value='disabled'
    />
    <Radio
      checked
      disabled
      id='radio-with-states-disabled-checked'
      label='Disabled + Checked Radio'
      name='radio-with-states-disabled-checked'
      value='disabled+checked'
    />
    <Radio
      id='radio-with-states-invalid'
      invalid
      label='Invalid Radio'
      name='radio-with-states-invalid'
      value='invalid'
    />
    <Radio
      checked
      id='radio-with-states-invalid-checked'
      invalid
      label='Invalid + Checked Radio'
      name='radio-with-states-invalid-checked'
      value='invalid+checked'
    />
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithDescription = args => (
  <Radio
    id='radio-with-description'
    value='red'
    label='Red'
    description='Red will be set as your color'
  />
)

// eslint-disable-next-line no-unused-vars
export const WithInline = args => (
  <Box display='flex'>
    <Radio
      defaultChecked
      name='radio-with-inline'
      value='one'
      label='One'
      id='radio-with-inline-one'
    />
    <Space width='md' />
    <Radio
      name='radio-with-inline'
      value='two'
      label='Two'
      id='radio-with-inline-two'
    />
  </Box>
)

const PayIcon = () => (
  <Icon>
    <>
      <g>
        <rect fill='none' height='24' width='24' />
      </g>
      <g>
        <path d='M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M8.46,14.45L7.1,13.83 c0.28-0.61,0.41-1.24,0.4-1.86c-0.01-0.63-0.14-1.24-0.4-1.8l1.36-0.63c0.35,0.75,0.53,1.56,0.54,2.4 C9.01,12.8,8.83,13.64,8.46,14.45z M11.53,16.01l-1.3-0.74c0.52-0.92,0.78-1.98,0.78-3.15c0-1.19-0.27-2.33-0.8-3.4l1.34-0.67 c0.64,1.28,0.96,2.65,0.96,4.07C12.51,13.55,12.18,14.86,11.53,16.01z M14.67,17.33l-1.35-0.66c0.78-1.6,1.18-3.18,1.18-4.69 c0-1.51-0.4-3.07-1.18-4.64l1.34-0.67C15.56,8.45,16,10.23,16,11.98C16,13.72,15.56,15.52,14.67,17.33z' />
      </g>
    </>
  </Icon>
)

// eslint-disable-next-line no-unused-vars
export const WithCustomMarkup = args => (
  <Box maxWidth='420px'>
    <Stack>
      <Radio
        defaultChecked
        description='Use a contactless payment method to avoid touching payment terminal'
        id='radio-with-custom-markup-contactless'
        name='radio-with-custom-markup'
        label={
          <Box
            display='inline-flex'
            alignItems='center'
            justifyContent='center'
          >
            Contactless Payment
            <Space width='sm' />
            <PayIcon />
          </Box>
        }
        value='contactless'
      />
      <Radio
        description={
          <Notification>
            <Text variant='caption'>
              You could be exposed to germs when touching a payment terminal
            </Text>
          </Notification>
        }
        id='radio-with-custom-markup-creditdebit'
        name='radio-with-custom-markup'
        label='Credit or Debit'
        value='creditdebit'
      />
    </Stack>
  </Box>
)

export const WithJSValidation = () => {
  const { errors, handleSubmit, register, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const onSubmit = () => {
    reset()
  }

  return (
    <Box maxWidth='420px'>
      <Card>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title='Using JavaScript Validation' />
          <CardContent>
            <Stack>
              <Text>
                In this example, Radio components are being rendered and
                controlled with external state. Typically, you should render
                Radio components inside of a &nbsp;
                <Link href='/?path=/story/components-radiogroup--basic'>
                  RadioGroup
                </Link>
                , but you can also render them on their own for special use
                cases.
              </Text>
              <Text variant='caption' color='onSurface.secondary'>
                Note: this example uses react-hook-form to manage state and
                provide error validation.
              </Text>
            </Stack>
          </CardContent>
          <CardContent>
            <Radio
              defaultChecked
              ref={register}
              id='one'
              label='One'
              name='example'
              value='one'
            />

            <Radio
              ref={register}
              id='two'
              label='Two'
              name='example'
              value='two'
            />

            <Radio
              ref={register({
                required: 'This field is required',
                validate(value) {
                  return value === 'three' || 'Must be three'
                },
              })}
              invalid={errors.example}
              id='three'
              label='Three'
              name='example'
              value='three'
            />
          </CardContent>
          <CardActions>
            <Button fullWidth type='submit'>
              Reset
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
          <Stack>
            <Text>
              You can enable built-in HTML validation by setting
              formNoValidate=false on your Input. Try submitting the input
              below.
            </Text>
            <Text variant='caption' color='onSurface.secondary'>
              Note: Many form components set noValidate=true. Make sure it is
              also set to false as well.
            </Text>
          </Stack>
        </CardContent>
        <CardContent>
          <Radio
            formNoValidate={false}
            id='with-html-validation-no'
            label='I do not agree'
            name='with-html-validation'
            required
            value='no'
          />
          <Radio
            formNoValidate={false}
            id='with-html-validation-yes'
            label='I agree'
            name='with-html-validation'
            value='yes'
            required
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
