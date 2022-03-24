import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createComponentStory } from '../../../utils'
import Box from '../Box'
import Button from '../Button'
import Card from './Card'
import CardActions from '../CardActions'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import FormControl from '../FormControl'
import Input from '../Input'
import Space from '../Space'
import Stack from '../Stack'
import Text from '../Text'

export default createComponentStory(Card, {
  caption: 'Contains content and actions related to a single subject.',
  description: `
    Use Cards to help users scan for relevant and actionable information.
    Elements, like text and images, should be placed on them in a way that clearly
    indicates hierarchy. Cards are designed to be used in conjunction with \`CardHeader\`,
    \`CardContent\`, and \`CardActions\`, but you can use custom components as well.

    ###### Notes

    * Card does not include a max-width, but you wrap it with a 
    [Box](/?path=/docs/components-card--basic) component like in the examples below.
  `,
  subcomponents: {
    CardActions,
    CardContent,
    CardHeader,
  },
})

export const Basic = args => (
  <Box maxWidth='360px'>
    <Card density={args.density}>
      <CardHeader title='Simple Card' />
      <CardContent>
        <Text variant='body'>
          This is a simple card. It uses CardHeader and CardContent to correctly
          position its children. It also has the default density.
        </Text>
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithHeader = args => (
  <Box maxWidth='360px'>
    <Stack space='lg'>
      <Card>
        <CardHeader subtitle='Subtitle' title='Card Header' />
        <CardContent>
          <Text variant='body'>
            This is a card with a header. It uses CardHeader to set a title and
            subtitle.
          </Text>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          avatar={
            <Box
              alignItems='center'
              backgroundColor='error'
              borderRadius='circular'
              color='onError.primary'
              display='flex'
              justifyContent='center'
              size='40px'
            >
              <Text variant='subtitle'>R</Text>
            </Box>
          }
          title='Shrimp and Chorizo Paella'
          subtitle='March 16, 2020'
        />
        <CardContent>
          <Text variant='body'>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Text>
        </CardContent>
      </Card>
    </Stack>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithActions = args => (
  <Box maxWidth='360px'>
    <Stack space='lg'>
      <Card>
        <CardHeader title='Left Aligned' />
        <CardContent>
          <Text>This card has left aligned actions</Text>
        </CardContent>
        <CardActions align='start'>
          <Button variant='tertiary'>Learn More</Button>
        </CardActions>
      </Card>
      <Card>
        <CardHeader title='Right Aligned' />
        <CardContent>
          <Text>This card has right aligned actions</Text>
        </CardContent>
        <CardActions align='end'>
          <Button color='neutral' variant='secondary'>
            Cancel
          </Button>
          <Button variant='primary'>Save</Button>
        </CardActions>
      </Card>
    </Stack>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithDensity = args => (
  <Box maxWidth='360px'>
    <Stack space='lg'>
      <Card density='default'>
        <CardHeader title='Default' />
        <CardContent>
          <Text>
            I am using the default density, which is the largest padding
            available
          </Text>
        </CardContent>
        <CardActions>
          <Button variant='tertiary'>Learn More</Button>
        </CardActions>
      </Card>
      <Card density='comfortable'>
        <CardHeader title='Comfortable' />
        <CardContent>
          <Text>
            I am using the comfortable density, which is a happy medium between
            compact and default
          </Text>
        </CardContent>
        <CardActions>
          <Button variant='tertiary'>Learn More</Button>
        </CardActions>
      </Card>
      <Card density='compact'>
        <CardHeader title='Compact' />
        <CardContent>
          <Text>
            I am using the compact density, which is the smallest option
            available
          </Text>
        </CardContent>
        <CardActions>
          <Button variant='tertiary'>Learn More</Button>
        </CardActions>
      </Card>
      <Card density='responsive'>
        <CardHeader title='Responsive' />
        <CardContent>
          <Text>
            I am using the responsive density. With this setting, the Card will
            adjust its density between default, comfortable, and compact based
            on the device screen size
          </Text>
        </CardContent>
        <CardActions>
          <Button variant='tertiary'>Learn More</Button>
        </CardActions>
      </Card>
    </Stack>
  </Box>
)

export const WithForm = () => {
  const [savedValues, setSavedValues] = useState({
    email: 'stillusing@aol.com',
    name: 'Jim Fishman',
    number: '(256) 555-5555',
  })
  const { register, getValues } = useForm()
  const [isEditing, setIsEditing] = useState(false)
  const handleSave = () => {
    setSavedValues(getValues())
    setIsEditing(false)
  }
  const handleCancel = () => {
    setIsEditing(false)
  }
  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <Box maxWidth='420px' marginX='auto'>
      <Card>
        <CardHeader
          action={
            <Button
              onClick={isEditing ? handleCancel : handleEdit}
              shape='pill'
              variant='tertiary'
            >
              {isEditing ? 'Cancel' : 'Change'}
            </Button>
          }
          title={isEditing ? 'Edit Profile' : 'Profile'}
        />
        <CardContent>
          <Stack space='xl'>
            {!isEditing ? (
              <Box>
                <Text variant='label'>Name</Text>
                <Space height='sm' />
                <Text>{savedValues.name}</Text>
              </Box>
            ) : (
              <FormControl label='Name'>
                <Input
                  defaultValue={savedValues.name}
                  id='name'
                  ref={register}
                  name='name'
                  type='text'
                />
              </FormControl>
            )}
            {!isEditing ? (
              <Box>
                <Text variant='label'>Mobile Number</Text>
                <Space height='sm' />
                <Text>{savedValues.number}</Text>
              </Box>
            ) : (
              <FormControl label='Mobile Number'>
                <Input
                  defaultValue={savedValues.number}
                  id='number'
                  ref={register}
                  name='number'
                  type='tel'
                />
              </FormControl>
            )}
            {!isEditing ? (
              <Box>
                <Text variant='label'>Email</Text>
                <Space height='sm' />
                <Text>{savedValues.email}</Text>
              </Box>
            ) : (
              <FormControl label='Email'>
                <Input
                  defaultValue={savedValues.email}
                  id='email'
                  ref={register}
                  name='email'
                  type='email'
                />
              </FormControl>
            )}
          </Stack>
        </CardContent>
        {isEditing && (
          <CardActions align='end'>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardActions>
        )}
      </Card>
    </Box>
  )
}
