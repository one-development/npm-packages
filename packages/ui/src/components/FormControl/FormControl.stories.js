import _ from 'lodash'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Box from '../Box'
import Button from '../Button'
import Card from '../Card'
import CardActions from '../CardActions'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import Input from '../Input'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import Select from '../Select'
import Space from '../Space'
import Text from '../Text'
import { createComponentStory } from '../../../utils'
import FormControl from './FormControl'

export default createComponentStory(FormControl, {
  caption: 'Provides a label, caption, and error for its child control.',
  description: `
    FormControl is a helpful wrapper used to provide the
    correct aria attributes to a form input and render a label,
    caption, or error next to it. When an error is provided,
    it is rendered instead of the caption.

    ###### Notes
    * The FormControl expects to receive a single form element,
    such as an [Input](/?path=/docs/components-input--basic),
    [Select](/?path=/docs/components-select--basic), or [RadioGroup](/?path=/docs/components-radiogroup--basic),
    as its child.
    * The form element should adhere to the <i>Form Element Requirements</i> (see below).
    * If the form element's \`id\` prop is not defined, it will throw an error.
    * The error, label, and caption will receive styling to reflect the form element's state,
    like \`disabled\`, \`invalid\`, etc.

    ###### Accessibility
    * Always define an \`id\` prop.
    * The \`id\` prop is used to set \`htmlFor\` on the label
    * The \`id\` props is also used to create unique ids for the \`label\`, \`error\`, and \`caption\` elements.
    * The form element will receive \`aria-labelledby\`, \`aria-describedby\`,
    and \`aria-errormessage\` props based on the label, caption, and error.

    ###### Form Element Requirements
    1. Must render a valid form element type (input, select, etc.)
    2. Must accept \`disabled\`, \`id\`, \`invalid\`, \`name\`, and \`required\` props
    3. Must spread any additional \`aria-*\` props into the rendered form element
  `,
})

export const Basic = args => (
  <FormControl {...args}>
    <Input
      fullWidth={false}
      id='form-control-basic-story'
      name='email'
      type='email'
      required={true}
    />
  </FormControl>
)

// eslint-disable-next-line no-unused-vars
export const WithLabel = args => (
  <Box maxWidth='320px'>
    <FormControl label='Email'>
      <Input
        id='form-control-with-label-story'
        name='email'
        type='email'
        required={true}
      />
    </FormControl>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithCaption = args => (
  <Box maxWidth='320px'>
    <FormControl caption='Your password must contain 1 uppercase letter, 1 number, and 1 special character'>
      <Input id='form-control-with-caption' type='password' />
    </FormControl>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithError = args => (
  <Box maxWidth='320px'>
    <FormControl error='Your password must contain 1 uppercase letter, 1 number, and 1 special character'>
      <Input id='form-control-with-error' type='password' />
    </FormControl>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithDisabled = args => (
  <Box maxWidth='320px'>
    <FormControl disabled>
      <Input
        id='form-control-with-disabled'
        type='text'
        placeholder='Disabled input'
      />
    </FormControl>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithCustomMarkup = args => (
  <Box maxWidth='320px'>
    <FormControl
      caption={
        <Box
          borderRadius='sm'
          backgroundColor='brand2Light'
          color='onBrand2Light.primary'
          padding='sm'
        >
          Provide your first and last name
        </Box>
      }
      label={<Box color='brand2'>Name</Box>}
    >
      <Input name='firstname' id='firstname' />
    </FormControl>
  </Box>
)

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
            You can use FormControl with built-in HTML validation. Just set
            formNoValidate=false on your form control components. Try submitting
            the form below.
          </Text>
          <Space height='md' />
          <Text variant='caption' color='onSurface.secondary'>
            Note: Many form components set noValidate=true. Make sure it is also
            set to false on your form.
          </Text>
        </CardContent>
        <CardContent>
          <FormControl label='Plan Type'>
            <Select
              formNoValidate={false}
              id='planType'
              name='planType'
              placeholder='-- select a plan --'
            >
              <option value={1}>Free</option>
              <option value={2}>Pro ($0.99/month)</option>
            </Select>
          </FormControl>
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
              In this example, a FormControl is used with various form controls,
              like Input, Select, and Radio. This example illustrates a
              realistic use case for FormControl. It uses react-hook-form to
              manage state and provide error validation.
            </Text>
          </CardContent>
          <CardContent>
            <FormControl label='Email' error={_.get(errors, 'email.message')}>
              <Input
                name='email'
                id='email'
                ref={register({
                  pattern: {
                    message: 'Email address is invalid',
                    value: /[^@]+@[^.]+\..+/,
                  },
                  required: 'Email is required',
                })}
                type='email'
              />
            </FormControl>

            <Space height='lg' />

            <FormControl
              caption='Choose a password with 1 number and 8 or more characters'
              error={_.get(errors, 'password.message')}
              label='Password'
            >
              <Input
                name='password'
                id='password'
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
            </FormControl>

            <Space height='lg' />

            <FormControl
              label='Country'
              error={_.get(errors, 'country.message')}
            >
              <Select
                defaultValue='us'
                name='country'
                id='country'
                ref={register({ required: 'Country is required' })}
              >
                <option value='ca'>Canada</option>
                <option value='mx'>Mexico</option>
                <option value='us'>United States</option>
              </Select>
            </FormControl>

            <Space height='lg' />

            <FormControl
              label='Choose a Plan'
              error={_.get(errors, 'planType.message')}
            >
              <RadioGroup defaultValue={0} name='planType' id='planType'>
                <Radio
                  description='Use an ad-supported version of the ACME app'
                  label='Free'
                  id='free'
                  ref={register({ required: 'Please select a plan type' })}
                  value={0}
                />
                <Radio
                  description='Skip the ads, get special discounts, and more'
                  label='Paid ($0.99/month)'
                  id='paid'
                  ref={register({ required: 'Please select a plan type' })}
                  value={1}
                />
              </RadioGroup>
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
