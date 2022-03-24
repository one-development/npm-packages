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
import Input from '../Input'
import Link from '../Link'
import Radio from '../Radio'
import RadioDetails from '../RadioDetails'
import RadioGroup from './RadioGroup'
import Stack from '../Stack'
import Space from '../Space'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(RadioGroup, {
  caption: 'Allows a user to select one value from a set of options',
  description: `
    RadioGroup is used to style
    [Radio](/?path=/docs/components-radio--basic) and
    [RadioDetails](/?path=/docs/components-radio-details--basic) components in a group.
    It provides a simpler API than manually connecting multiple Radio components.

    ###### Notes
    * The RadioGroup only accepts Radio and RadioDetails components as children.
    * A RadioDetails component *must* be preceeded by a Radio component or it will be ignored.
    * A RadioDetails component is only displayed when its preceeding Radio component is active.
    * The \`name\`, \`disabled\`, and \`required\` props can be set on the RadioGroup
    to avoid manually setting them on each Radio component.
    * When \`onChange\` and \`value\` are specified,
    the *RadioGroup* will correctly connect these props to the childrens' events.

    ###### Accessibility
    * Always define an \`id\` for RadioGroup components
    * Always define \`aria-label\` or set \`aria-labelledby\` to the ID of
    custom label text (FormControl does this for you)
    * RadioGroup will automatically define \`aria-disabled\`, \`aria-invalid\`,
    and \`aria-required\` based on the corresponding props
    * RadioGroup will automatically define \`aria-controls\` and \`aria-expanded\` on
    a RadioDetail's preceeding Radio component.
  `,
  subcomponents: {
    Radio,
    RadioDetails,
  },
})

export const Basic = args => (
  <RadioGroup
    defaultValue='red'
    name='radio-group-basic'
    id='radio-group-basic'
    {...args}
  >
    <Radio id='radio-group-basic-red' value='red' label='Red' />
    <Radio id='radio-group-basic-blue' value='blue' label='blue' />
  </RadioGroup>
)

// eslint-disable-next-line no-unused-vars
export const WithDetailsText = args => (
  <Box maxWidth='420px'>
    <RadioGroup defaultValue='red' name='rgwdt' id='rgwdt'>
      <Radio id='rgwdt-red' value='red' label='Red' />
      <RadioDetails id='rgwdt-red-details'>
        <Text>Red is a great color</Text>
      </RadioDetails>
      <Radio id='rgwdt-blue' value='blue' label='blue' />
      <RadioDetails id='rgwdt-blue-details'>
        <Text>But blue is even better!</Text>
      </RadioDetails>
    </RadioGroup>
  </Box>
)

export const WithDetailsForm = () => {
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
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title='Using Radio Details' />
          <CardContent>
            <Text>
              You can use the RadioDetails component to automatically show or
              hide additional context beneath the selected Radio option. For
              example, you can display Apple Pay instructions or additional
              credit card fields.
            </Text>
          </CardContent>
          <CardContent>
            <FormControl
              error={_.get(errors, 'payment-type.message')}
              label='Payment Type'
            >
              <RadioGroup
                defaultValue='creditcard'
                id='rgwdf-payment-type'
                name='payment-type'
              >
                <Radio
                  ref={register({ required: 'Please choose a payment type' })}
                  value='applepay'
                  label='Apple Pay'
                  id='rgwdf-applepay'
                />
                <RadioDetails id='rgwdf-applepay-details'>
                  <Text>
                    {
                      'To complete your purchase, click the "Buy with Apple Pay" button on the next screen'
                    }
                  </Text>
                </RadioDetails>
                <Radio
                  ref={register({ required: 'Please choose a payment type' })}
                  value='creditcard'
                  label='Credit Card'
                  id='rgwdf-creditcard'
                />
                <RadioDetails id='rgwdf-creditcard-details'>
                  <FormControl
                    error={_.get(errors, 'card-number.message')}
                    label='Card Number'
                  >
                    <Input
                      ref={register({
                        required: 'Card number is required',
                      })}
                      id='rgwdf-card-number'
                      name='card-number'
                      type='text'
                    />
                  </FormControl>
                  <Space height='md' />
                  <FormControl
                    error={_.get(errors, 'expiry.message')}
                    label='Expiration (MM/YY)'
                  >
                    <Input
                      ref={register({ required: 'Expiration is required' })}
                      mask='##/##'
                      id='rgwdf-expiry'
                      name='expiry'
                      type='text'
                    />
                  </FormControl>
                  <Space height='md' />
                  <FormControl
                    error={_.get(errors, 'zipcode.message')}
                    label='Zip Code'
                  >
                    <Input
                      ref={register({ required: 'Zip Code is required' })}
                      id='rgwdf-zipcode'
                      name='zipcode'
                      type='text'
                    />
                  </FormControl>
                </RadioDetails>
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
        <CardHeader title='Using Controlled State' />
        <CardContent>
          <Text>
            In this example, a RadioGroup is being used as a controlled
            component. This means that <i>onChange</i> and <i>value</i> props
            are being provided. The RadioGroup will correctly provide these
            props to its children.
          </Text>
        </CardContent>
        <CardContent>
          <RadioGroup
            id='rgwcs'
            name='color'
            value={value}
            onChange={handleChange}
          >
            <Radio id='rgwcs-red' value='red' label='Red' />
            <Radio id='rgwcs-blue' value='blue' label='Blue' />
            <Radio id='rgwcs-green' value='green' label='Green' />
          </RadioGroup>
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
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title='Using JavaScript Validation' />
          <CardContent>
            <Stack>
              <Text>
                In this example, a RadioGroup is being rendered and controlled
                with external state. This example uses react-hook-form to manage
                state and provide error validation. It also uses the{' '}
                <Link href='/?path=/docs/components-formcontrol--basic'>
                  FormControl
                </Link>{' '}
                component to provide errors and labels.
              </Text>
              <Text variant='caption' color='onSurface.secondary'>
                Note: in order to demonstrate validation, this RadioGroup does
                not define a defaultValue. However, this is considered bad
                practice and confusing UX for users.
              </Text>
            </Stack>
          </CardContent>
          <CardContent>
            <FormControl
              error={_.get(errors, 'notify.message')}
              label='Notification Preference'
            >
              <RadioGroup name='notify' id='rgwjsv-notification-preference'>
                <Radio
                  description='We will never send you emails'
                  id='rgwjsv-notify-none'
                  label='None'
                  value='none'
                  ref={register({
                    required: 'Please choose your notification preference',
                  })}
                />
                <Radio
                  description='We will only send you important notification emails'
                  id='rgwjsv-notify-some'
                  label='Some'
                  value='some'
                  ref={register({
                    required: 'Please choose your notification preference',
                  })}
                />
                <Radio
                  description='We will send you notification and marketing emails'
                  id='rgwjsv-notify-all'
                  label='All'
                  value='all'
                  ref={register({
                    required: 'Please choose your notification preference',
                  })}
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

// eslint-disable-next-line no-unused-vars
export const WithBrowserValidation = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardHeader title='Using Browser Validation' />
      <CardContent>
        <Text>
          You can enable built-in HTML validation by setting
          formNoValidate=false on your RadioGroup. It will be forwared to all
          Radio children. Try submitting the form below to see for yourself.
        </Text>
        <Space height='md' />
        <Text variant='caption' color='onSurface.secondary'>
          Note: Many form components set noValidate=true. Make sure it is also
          set to false as well.
        </Text>
      </CardContent>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <CardContent>
          <RadioGroup name='color' formNoValidate={false} id='rgwbv-color'>
            <Radio value='red' label='Red' id='rgwbv-red' />
            <Radio value='blue' label='Blue' id='rgwbv-blue' />
          </RadioGroup>
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
