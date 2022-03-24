/* eslint-disable import/no-extraneous-dependencies */
import dedent from 'dedent'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import stringifyObject from 'stringify-object'
import styled from 'styled-components'
// eslint-disable-next-line object-curly-newline
import { Box, lightTheme, Space, Stack, Text, ThemeProvider } from '../../src'

const Code = styled.pre(({ theme }) => ({
  backgroundColor: theme.colors.background,
  borderRadius: theme.radii.sm,
  color: theme.colors.onBackground.primary,
  margin: 0,
  marginTop: theme.space.custom(1.5),
  padding: theme.space.md,
}))

export default function ScaleVisualizer({
  name,
  helperDefs = {},
  renderPreview,
}) {
  const scale = lightTheme[name]
  const ordered = _.isArray(scale)
  const helpers = Object.keys(helperDefs)
  const steps = ordered ? scale.map((value, index) => index) : null
  const aliases = ordered
    ? Object.keys(_.omit(scale, [...steps, ...helpers]))
    : Object.keys(_.pickBy(scale, value => !_.isFunction(value)))

  const stringified = useMemo(
    () =>
      stringifyObject(scale, {
        filter: (obj, prop) => !_.isFunction(obj[prop]),
        indent: '  ',
      }),
    [scale]
  )

  const formatValue = key => (_.isNumber(key) ? key : `'${key}'`)

  return (
    <ThemeProvider theme={lightTheme}>
      <Box borderRadius='sm' border='thin' paddingX='md' paddingY='lg'>
        {renderPreview && (
          <Box marginBottom='xl'>
            <Stack space='md'>
              {aliases.map(key => renderPreview(scale[key], key))}
            </Stack>
          </Box>
        )}
        <Text variant='label'>Scale</Text>
        <Code>{`theme.${name} = ${stringified}`}</Code>
        {ordered && (
          <>
            <Space height='xl' />
            <Text variant='label'>Aliases</Text>
            <Code>
              {aliases.map(key => (
                <div key={key}>
                  {`theme.${name}.${key} = ${formatValue(scale[key])}`}
                </div>
              ))}
            </Code>
          </>
        )}
        {!_.isEmpty(helpers) && helperDefs && (
          <>
            <Space height='xl' />
            <Text variant='label'>Helpers</Text>
            <Code>
              <Stack space='md'>
                {helpers.map(key => (
                  <Box
                    color='inherit'
                    backgroundColor='transparent'
                    style={{ overflow: 'hidden', whiteSpace: 'break-spaces' }}
                    key={key}
                  >
                    {_.has(helperDefs, key) && `theme.${name}.${key}`}
                    {_.has(helperDefs, key) &&
                      `(${_.get(helperDefs, key).args.join(', ')})`}
                    {_.has(helperDefs, key) && (
                      <Box
                        backgroundColor='transparent'
                        color='onBackground.hint'
                        paddingLeft='lg'
                      >
                        {`/* `}
                        {dedent(_.get(helperDefs, key).description)}
                        {` */`}
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            </Code>
          </>
        )}
      </Box>
    </ThemeProvider>
  )
}

ScaleVisualizer.propTypes = {
  helperDefs: PropTypes.object,
  name: PropTypes.string,
  renderPreview: PropTypes.func,
}

function ArrayScale({ name, scale }) {
  const steps = scale.map((value, index) => index)
  const helpers = Object.keys(scale).filter(key => _.isFunction(scale[key]))
  const aliases = Object.keys(_.omit(scale, [...steps, ...helpers])).map(
    key => key
  )
  const formatValue = key => (_.isNumber(key) ? key : `"${key}"`)

  return (
    <div>
      <Text variant='label'>Preview</Text>
      <Text variant='label'>Scale</Text>
      <pre>[</pre>
      {steps.map(index => (
        <pre key={index}>{`  ${formatValue(scale[index])},`}</pre>
      ))}
      <pre>]</pre>
      <Space height='md' />
      <Text variant='label'>Aliases</Text>
      {aliases.map(key => (
        <pre key={key}>{`${name}.${key} = ${formatValue(scale[key])}`}</pre>
      ))}
      <Space height='md' />
      <Text variant='label'>Helpers</Text>
      {helpers.map(key => (
        <pre key={key}>{`${scale[key].description || key}`}</pre>
      ))}
    </div>
  )
}
ArrayScale.propTypes = {
  name: PropTypes.string,
  scale: PropTypes.array,
}

function ObjectScale({ scale }) {
  const helpers = Object.keys(scale).filter(key => _.isFunction(scale[key]))

  return (
    <div>
      <Text variant='label'>Scale</Text>
      <pre>
        {stringifyObject(scale, {
          filter: (obj, prop) => !_.isFunction(obj[prop]),
          indent: '  ',
        })}
      </pre>
      <Space height='md' />
      <Text variant='label'>Helpers</Text>
      {helpers.map(key => (
        <pre key={key}>{`${scale[key].description || key}`}</pre>
      ))}
    </div>
  )
}

ObjectScale.propTypes = {
  scale: PropTypes.object,
}

function ObjectVisualizer({ value: obj, indent = 0 }) {
  const tabChars = new Array((indent + 1) * 2).fill(' ').join('')
  return (
    <>
      <pre style={{ display: 'inline', margin: 0, padding: 0 }}>{'{'}</pre>
      {Object.keys(obj)
        .filter(key => !_.isFunction(obj[key]))
        .map(key => {
          const value = obj[key]

          if (_.isObject(value)) {
            return (
              <>
                <pre
                  style={{ display: 'inline', margin: 0, padding: 0 }}
                >{`${tabChars}${key}: `}</pre>
                <ObjectVisualizer indent={indent + 1} value={value} />
              </>
            )
          }

          const formatted = _.isNumber(value) ? `${value},` : `"${value}",`
          return (
            <pre style={{ display: 'block', margin: 0, padding: 0 }} key={key}>
              {`${tabChars}${key}: ${formatted}`}
            </pre>
          )
        })}
      <pre style={{ display: 'inline', margin: 0, padding: 0 }}>
        {`${tabChars}}${indent > 0 ? ',' : ''}`}
      </pre>
    </>
  )
}

ObjectVisualizer.propTypes = {
  indent: PropTypes.number,
  value: PropTypes.object,
}
