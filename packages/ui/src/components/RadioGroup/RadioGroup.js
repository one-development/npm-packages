import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import resets from '../utils/styleResets'
import useInvariant from '../utils/useInvariant'
import Radio from '../Radio'
import RadioDetails from '../RadioDetails'

const Root = styled.div(({ theme, styleProps }) => ({
  ...resets,
  border: theme.borders.thin,
  borderRadius: theme.radii.sm,
  ...(styleProps.invalid && {
    borderColor: theme.colors.error,
  }),
}))

const Option = styled.div(({ theme, styleProps }) => ({
  padding: theme.space.md,
  ...(styleProps.bordered && {
    borderTop: theme.borders.thin,
    borderTopColor: styleProps.invalid
      ? theme.colors.error
      : theme.colors.onSurface.divider,
  }),
  ...(styleProps.condensed && {
    padding: theme.space.custom(1, 2),
  }),
}))

const Details = styled.div(({ theme, styleProps }) => ({
  ...(styleProps.bordered && {
    borderTop: theme.borders.thin,
    borderTopColor: styleProps.invalid
      ? theme.colors.error
      : theme.colors.onSurface.divider,
  }),
  ...(styleProps.disabled && {
    '*': {
      opacity: 0.75,
    },
  }),
}))

const RadioGroup = forwardRef((props, ref) => {
  const {
    as,
    children,
    defaultValue,
    disabled,
    id,
    invalid: hasInvalidProp,
    name,
    formNoValidate,
    onChange,
    onInput,
    onValidate,
    required,
    value,
    ...rest
  } = props
  const isControlled =
    _.has(props, 'value') && props.onChange !== RadioGroup.defaultProps.onChange
  const [hasValidationError, setHasValidationError] = useState(false)
  const invalid = formNoValidate ? hasInvalidProp : hasValidationError
  const [trackedValue, setTrackedValue] = useState(
    isControlled ? value : defaultValue
  )
  const createInputHandler = cb => e => {
    if (!isControlled) {
      setTrackedValue(e.target.value)
    }

    if (onInput) {
      onInput(e)
    }

    if (cb) {
      cb(e)
    }
  }

  const createValidateHandler = cb => isValid => {
    setHasValidationError(!isValid)

    if (onValidate) {
      onValidate(isValid)
    }

    if (cb) {
      cb(isValid)
    }
  }

  const childElements = React.Children.toArray(children)
  const childElementsAreValid = childElements.reduce(
    (valid, current, index) => {
      if (!valid) return valid
      if (current.type === Radio) return valid
      if (current.type === RadioDetails) {
        const previous = childElements[index - 1]
        return previous.type === Radio
      }
      return false
    },
    true
  )

  useInvariant(
    childElementsAreValid,
    'Warning: Failed prop type: Prop `children` contains unexpected or incorrectly ordered elements'
  )

  return (
    <Root
      {...rest}
      aria-invalid={invalid}
      /**
       * When there's no aria-labelledby prop, we should add an
       * aria-label. The "htmlFor" prop does not affect non-labelable elements,
       * like a RadioGroup div.
       */
      {...(!rest['aria-labelledby'] && {
        'aria-label': props['aria-label'] || name,
      })}
      aria-disabled={disabled}
      aria-required={required}
      as={as}
      id={id}
      ref={ref}
      role='radiogroup'
      styleProps={{ invalid }}
    >
      {childElements.map((child, index) => {
        if (child.type === Radio) {
          const nextChild = childElements[index + 1]

          return (
            <Option
              key={child.props.id || child.props.value}
              styleProps={{
                bordered: index !== 0,
                condensed: !child.props.description,
                invalid,
              }}
            >
              {React.cloneElement(child, {
                // We only want to provide props related to state when the RadioGroup is controlled
                ...(isControlled && {
                  checked: value === child.props.value,
                  onChange,
                }),
                ...(nextChild &&
                  nextChild.type === RadioDetails && {
                    'aria-controls': nextChild.props.id,
                    'aria-expanded': isControlled
                      ? value === child.props.value
                      : trackedValue === child.props.value,
                  }),
                // If defined, defaultValue should get precedence over a child's defaultChecked prop
                defaultChecked: _.has(props, 'defaultValue')
                  ? defaultValue === child.props.value
                  : child.props.defaultChecked,
                // A single child is allowed to be disabled even when the RadioGroup is not
                disabled: child.props.disabled || disabled,
                // When formNoValidate=false, RadioGroup tracks validation state for all radios
                invalid: formNoValidate ? child.props.invalid : false,
                // These props must match for all children, so the RadioGroup prop gets precedence
                // eslint-disable-next-line sort-keys
                formNoValidate: true,
                name: name || child.props.name,
                onInput: createInputHandler(child.props.onInput),
                onValidate: createValidateHandler(child.props.onValidate),
                required: _.has(props, 'required')
                  ? required
                  : child.props.required,
              })}
            </Option>
          )
        }

        const prevChild = childElements[index - 1]
        const selectedValue = isControlled ? value : trackedValue
        const prevChildSelected =
          prevChild && prevChild.props.value === selectedValue

        if (child.type === RadioDetails && prevChildSelected) {
          return (
            <Details
              key={child.props.id}
              styleProps={{
                bordered: index !== 0,
                disabled: prevChild.props.disabled || disabled,
                invalid,
              }}
            >
              {child}
            </Details>
          )
        }

        return null
      })}
    </Root>
  )
})

RadioGroup.displayName = 'RadioGroup'
RadioGroup.defaultProps = {
  as: 'div',
  disabled: false,
  formNoValidate: true,
  invalid: false,
  required: true,
}
RadioGroup.propTypes = {
  /**
   * When RadioGroup is rendered under a FormControl, this prop will be set automatically.
   * Otherwise, you can set it yourself. Normally, you would set this to the ID of an error
   * message or caption.
   */
  'aria-describedby': PropTypes.string,
  'aria-label': PropTypes.string,
  /**
   * When RadioGroup is rendered under a FormControl, this prop will be set automatically.
   * Otherwise, you can set it yourself. Normally, you would set this to the ID of a label.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Content for the RadioGroup, must be a [Radio](/?path=/docs/components-radio--basic)
   * or [RadioDetails](/?path=/docs/components-radio-details--basic) component.
   * Note: A RadioDetails component must be *immediately preceeded* by a Radio component.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Will determine which Radio receives a `defaultChecked` prop.
   * Note: this prop will override any `defaultChecked` prop that is
   * set on a child Radio element.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Will determine if all Radio children are disabled.
   * Note: you can set `disabled` on individual children
   * instead if you don't need the entire group to be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * When false, the RadioGroup will style HTML validation pseudo
   * classes, like :invalid. Note: this prop will be forwarded to all
   * Radio children.
   */
  formNoValidate: PropTypes.bool,
  /**
   * Sets the ID for the root element.
   */
  id: PropTypes.string.isRequired,
  /**
   * Determines if the RadioGroup will use invalid styling
   */
  invalid: PropTypes.bool,
  /**
   * Input name attribute to set on all Radio children.
   * Will take precedence over name prop set on individual children.
   */
  name: PropTypes.string,
  /**
   * Called when the blur event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onBlur: PropTypes.func,
  /**
   * Called when the input value is changed
   *
   * @param {object} event The event source of the callback.
   */
  onChange: PropTypes.func,
  /**
   * Called when the focus event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onInput: PropTypes.func,
  /**
   * Called when the input validity state changes. Useful to coordinate styling with native input validation.
   *
   * @param {boolean} valid Represents whether or not the input is valid
   */
  onValidate: PropTypes.func,
  /**
   * Applies required state styling and sets `aria-required` to `true`.
   * Note: this prop will be forwarded to all Radio children and takes
   * precedence over a required prop set on individual child elements.
   */
  required: PropTypes.bool,
  /**
   * Input value attribute. Will be used to determine which Radio receives `checked`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default RadioGroup
