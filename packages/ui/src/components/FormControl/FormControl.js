import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Box from '../Box'
import Notification from '../Notification'
import Text from '../Text'
import resets from '../utils/styleResets'
import useInvariant from '../utils/useInvariant'

const Root = styled.div(resets)

const Caption = styled.div(({ theme }) => ({
  marginTop: theme.space.sm,
}))

const Label = styled.div(({ theme }) => ({
  marginBottom: theme.space.sm,
}))

const FormControl = React.forwardRef((props, ref) => {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledby,
    as,
    caption,
    children,
    className,
    disabled,
    error,
    id,
    label,
    name,
    required,
    ...rest
  } = props

  const child = React.Children.only(children)

  // Validate that an id is defined
  const inputId = id || child.props.id

  useInvariant(
    !_.isNil(inputId),
    'Warning: Missing prop type: The prop `id` must be defined in `FormControl` or its child.'
  )

  const inputName = name || child.props.name
  const inputRequired = _.has(props, 'required')
    ? required
    : child.props.required
  const errorId = error && `${inputId}-error`
  const labelId = label && `${inputId}-label`
  const captionId = caption && `${inputId}-caption`
  const invalid = Boolean(error)
  const describedBy = (() => {
    if (error) return errorId
    if (caption) return captionId
    return ariaDescribedby || child.props['aria-describedby']
  })()
  const labelledBy = label
    ? labelId
    : ariaLabelledby || child.props['aria-labelledby']

  const inputEl = React.cloneElement(child, {
    'aria-describedby': describedBy,
    'aria-errormessage': errorId,
    'aria-labelledby': labelledBy,
    disabled, // Disabled must match for label, caption, and input
    id: inputId,
    invalid, // Invalid must match for label, caption, and input
    name: inputName,
    required: inputRequired,
  })

  return (
    <Root {...rest} as={as} className={className} ref={ref}>
      {label && (
        <Label>
          <Text
            as='label'
            color={disabled ? 'onSurface.disabled' : 'onSurface.primary'}
            id={labelId}
            variant='label'
            htmlFor={inputId}
          >
            {label}
          </Text>
        </Label>
      )}
      {inputEl}
      {caption && !error && (
        <Caption>
          <Text
            color={disabled ? 'onSurface.disabled' : 'onSurface.hint'}
            id={captionId}
            variant='caption'
            variantMapping={{ caption: 'span' }}
          >
            {caption}
          </Text>
        </Caption>
      )}
      {error && (
        <Box marginTop='sm'>
          <Notification density='compact' variant='error'>
            <Text
              color='inherit'
              id={errorId}
              variant='caption'
              variantMapping={{ caption: 'span' }}
            >
              {error}
            </Text>
          </Notification>
        </Box>
      )}
    </Root>
  )
})

FormControl.displayName = 'FormControl'
FormControl.defaultProps = {
  as: 'div',
  caption: null,
  disabled: false,
  error: null,
}
FormControl.propTypes = {
  /**
   * HTML aria-describedby attribute, which will override an `aria-describedby` prop
   * defined on the child. Note: this prop will be *ignored* when
   * a `caption` or `error` prop is defined.
   */
  'aria-describedby': PropTypes.string,
  /**
   * HTML aria-labelledby attribute, which will override an `aria-labelledby` prop
   * defined on the child.
   * Note: this prop will be *ignored* when
   * a `label` prop is defined.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * A small message rendered below the form control. Used to provide
   * a helpful hint to the user about the control's purpose or requirements.
   * It should typically be plain text, but can be a custom node instead.
   * Note: a [Text](/?path=/docs/components-text--basic) component is rendered around
   * any custom nodes, so restrict usage to elements that are valid descendants of `span`.
   */
  caption: PropTypes.node,
  /**
   * Content wrapped by FormControl. Must be a single element implementing
   * the form control behavior described above.
   */
  children: PropTypes.element,
  className: PropTypes.string,
  /**
   * Determines if the content will display in disabled state.
   * Note: a disabled prop will be passed to the child control.
   */
  disabled: PropTypes.bool,
  /**
   * An error message to indicate the control is invalid.
   * If `error` and `caption` are both provided, only error will be rendered. Notes:
   * <br/> - when the `error` prop is defined, an `invalid:true` prop will be passed to the child control.
   * <br/> - a [Text](/?path=/docs/components-text--basic) component is rendered around
   * any custom nodes, so restrict usage to elements that are valid descendants of `span`.
   */
  error: PropTypes.node,
  /**
   * As a convenience, you can set an `id` prop on the FormControl,
   * and it will be forwarded to the child. Note: you must specify `id`
   * on the child if it is not specified here.
   */
  id: PropTypes.string,
  /**
   * A label to display above the form element.
   * It should generally be plain text, but can be a custom node instead.
   * Note: a [Text](/?path=/docs/components-text--basic) component is rendered around
   * any custom nodes, so restrict usage to elements that are valid descendants of
   * `label` and `span`.
   */
  label: PropTypes.node,
  /**
   * As a convenience, you can set a `name` prop on the FormControl,
   * and it will be forwarded to the child control.
   */
  name: PropTypes.string,
  /**
   * As a convenience, you can set a `required` prop on the FormControl,
   * and it will be forwarded to the child control.
   */
  required: PropTypes.bool,
}

export default FormControl
