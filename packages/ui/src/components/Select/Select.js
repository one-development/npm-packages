import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import ChevronDownIcon from '../../icons/ChevronDown'
import partition from '../utils/partition'
import px from '../utils/px'
import resets from '../utils/styleResets'
import useEventCallback from '../utils/useEventCallback'
import useForkRef from '../utils/useForkRef'
import useValidation from '../utils/useValidation'
import useWatcher from '../utils/useWatcher'

const iconSize = 16

const Root = styled.div(({ theme, styleProps }) => {
  const borderWidthDiff =
    px.toNumber(theme.borderWidths.thick) - px.toNumber(theme.borderWidths.thin)
  const normalPadding = px.toNumber(theme.space.sm)
  const iconMargin = px.toNumber(theme.space.xs) + px.toNumber(theme.space.sm)
  const iconWhitespace = iconSize + iconMargin
  const withIconPadding = normalPadding + iconWhitespace

  return {
    ...resets,
    backgroundColor: styleProps.transparent
      ? 'transparent'
      : theme.colors.surface,
    borderRadius: theme.radii.sm,
    color: theme.colors.onSurface.primary, // set color here to allow child elements to inherit
    cursor: 'pointer',
    display: 'inline-block',
    flex: '0 0 auto',
    fontFamily: 'inherit',
    fontSize: '1rem', // 16px min to prevent iOS Safari zoom on focus
    height: theme.sizes.inputHeight,
    maxWidth: '100%',
    minWidth: 0,
    position: 'relative',
    ...(styleProps.fullWidth && {
      display: 'block',
      flex: '1 0 auto',
    }),
    ...(styleProps.disabled && {
      cursor: 'not-allowed',
      opacity: 0.5,
    }),
    select: {
      ...resets,
      // Remove IE 11 arrow
      '&:-ms-expand': {
        display: 'none',
      },
      appearance: 'none',
      backgroundColor: 'transparent',
      border: theme.borders.thin,
      borderColor: styleProps.invalid
        ? theme.colors.error
        : theme.colors.onSurface.divider,
      borderRadius: theme.radii.sm,
      color: 'currentColor',
      display: 'block',
      flex: '1 1 auto',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      height: theme.sizes.inputHeight,
      minWidth: '250px', // browser default
      outline: `${px(borderWidthDiff)} solid gray`,
      outlineColor: 'transparent',
      padding: `0 ${px(normalPadding + borderWidthDiff)}`,
      paddingRight: borderWidthDiff + withIconPadding,
      WebkitTapHighlightColor: 'transparent',
      ...(styleProps.empty && {
        color: theme.colors.onSurface.hint,
      }),
      // eslint-disable-next-line sort-keys
      '&:focus': {
        border: theme.borders.thick,
        borderColor: styleProps.invalid
          ? theme.colors.error
          : theme.colors.onSurface.hint,
        outline: 'none',
        padding: `0 ${px(normalPadding)}`,
        paddingRight: withIconPadding,
      },
      ...(styleProps.disabled && {
        backgroundColor: theme.colors.onSurface.divider,
        cursor: 'not-allowed',
      }),
      ...(styleProps.fullWidth && {
        minWidth: 0,
        width: '100%',
      }),
    },
  }
})

const SelectIcon = styled.div(({ theme }) => ({
  cursor: 'pointer',
  fill: 'currentColor',
  left: 'auto',
  pointerEvents: 'none',
  position: 'absolute',
  right: theme.space.custom(1),
  top: px((px.toNumber(theme.sizes.inputHeight) - iconSize) / 2),
  // eslint-disable-next-line sort-keys
  'select:active + &': {
    transform: 'rotate(180deg)',
  },
}))

const Select = forwardRef((props, forwardedRef) => {
  const {
    'aria-autocomplete': ariaAutoComplete,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    // aria-hidden is stripped from props to avoid it being set on focusable elements
    'aria-hidden': ariaHidden,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    as,
    autoComplete,
    autoFocus,
    className,
    children: childrenProp,
    defaultValue: defaultValueProp,
    disabled,
    form,
    formNoValidate,
    fullWidth,
    id,
    invalid: hasInvalidProp,
    multiple,
    name,
    onBlur,
    onChange: onChangeProp,
    onFocus,
    onInvalid,
    onValidate,
    placeholder,
    required,
    select,
    size,
    style,
    tabIndex,
    transparent,
    value: valueProp,
    ...rest
  } = props
  const children = React.Children.toArray(childrenProp)
  const options = placeholder
    ? [
        <option key='placeholder' value=''>
          {placeholder}
        </option>,
        ...children,
      ]
    : children

  // Provide first option as fallback for value/defaultValue like a native select does
  const firstValue = options[0].props.value
  const controlled = _.has(props, 'value')
  const defaultValue =
    !controlled && _.isUndefined(defaultValueProp)
      ? firstValue
      : defaultValueProp
  const value = controlled && _.isUndefined(valueProp) ? firstValue : valueProp

  // Track if the select is empty
  const [empty, setIsEmpty] = useState(
    controlled ? value === '' : defaultValue === ''
  )
  // Check if select is empty on change
  const onChange = e => {
    const next = e && e.target && e.target.value

    setIsEmpty(next === '')

    if (onChangeProp) {
      onChangeProp(e)
    }
  }

  const {
    createChangeHandler,
    createInvalidHandler,
    isInvalid: hasValidationError,
    register: validationRef,
  } = useValidation({ mode: 'onSubmit' })

  // Determine if input is styling is based on HTML validation or invalid prop
  const invalid = formNoValidate ? hasInvalidProp : hasValidationError

  // Create event handlers for the input element
  const handleChange = useEventCallback(createChangeHandler(onChange))
  const handleInvalid = useEventCallback(createInvalidHandler(onInvalid))
  const handleValidityChange = hasError => {
    const valid = !hasError

    if (onValidate) {
      onValidate(valid)
    }
  }

  // Report any changes to validity state via the onValidate prop
  useWatcher(hasValidationError, handleValidityChange)

  // Spread aria-* props into the input element
  const isAria = (val, prop) => /^aria-.*$/.test(prop)
  const [ariaProps, rootProps] = partition(rest, isAria)

  return (
    <Root
      {...rootProps}
      as={as}
      className={className}
      style={style}
      styleProps={{
        disabled,
        empty,
        fullWidth,
        invalid,
        transparent,
      }}
    >
      {React.cloneElement(
        select,
        {
          ...ariaProps,
          'aria-autocomplete': ariaAutoComplete,
          'aria-describedby': ariaDescribedBy,
          'aria-disabled': disabled,
          'aria-errormessage': ariaErrorMessage,
          'aria-invalid': invalid,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          'aria-required': required,
          autoComplete,
          autoFocus,
          defaultValue,
          disabled,
          form,
          formNoValidate,
          id,
          multiple,
          name,
          onBlur,
          onChange: handleChange,
          onFocus,
          onInvalid: handleInvalid,
          ref: useForkRef(forwardedRef, validationRef),
          required,
          size,
          tabIndex,
          value,
        },
        options
      )}
      <SelectIcon as={ChevronDownIcon} size={px(iconSize)} scalable={false} />
    </Root>
  )
})

Select.displayName = 'Select'
Select.defaultProps = {
  as: 'div',
  autoComplete: 'on',
  autoFocus: false,
  formNoValidate: true,
  fullWidth: true,
  invalid: false,
  multiple: false,
  onBlur: () => {},
  onChange: () => {},
  required: true,
  select: <select></select>,
  transparent: false,
}
Select.propTypes = {
  'aria-autocomplete': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  /**
   * @ignore
   */
  'aria-hidden': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Determines if the browser should provide value suggestions
   */
  autoComplete: PropTypes.string,
  /**
   * Determines if the select control should focus on load
   */
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Sets the initial value
   */
  defaultValue: PropTypes.string,
  /**
   * Determines if the input is disabled
   */
  disabled: PropTypes.bool,
  /**
   * The <form> element to associate the `select` with
   * (its form owner). The value of this attribute must be the id of
   * a <form> in the same document. Note: if this attribute is not set,
   * the `select` is associated with its ancestor <form> element, if any.
   */
  form: PropTypes.string,
  /**
   * Input formnovalidate attribute. Also determines if the input
   * will apply error styling for :invalid pseudo class.
   * NOTE: In accordance with HTML semantics, this prop is only spread
   * to the input element when type is "submit" or "image".
   */
  formNoValidate: PropTypes.bool,
  /**
   * Determines if the input should grow to fill its parents width
   */
  fullWidth: PropTypes.bool,
  /**
   * Select id attribute
   */
  id: PropTypes.string.isRequired,
  /**
   * Applies invalid state styling and sets aria-invalid attribute to `true`
   */
  invalid: PropTypes.bool,
  /**
   * Determines if multiple options can be selected in the list.
   * When it is set to false, only one option can be selected at a time.
   * When it is set to true, most browsers will show a scrolling list box
   * instead of a single line dropdown.
   */
  multiple: PropTypes.bool,
  /**
   * Specifies the name of the select control
   */
  name: PropTypes.string.isRequired,
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
   * Called when input invalid event is triggered.
   *
   * @param {object} event The event source of the callback.
   */
  onInvalid: PropTypes.func,
  /**
   * Called when the select validity state changes.
   * Useful to coordinate styling when using `formNoValidate={false}` for
   * native form validation.
   *
   * @param {boolean} valid Represents whether or not the input is valid
   */
  onValidate: PropTypes.func,
  /**
   * Sets the text for a placeholder option that cannot be selected
   *
   * @param {object} event The event source of the callback.
   */
  placeholder: PropTypes.string,
  /**
   * Applies required state styling and sets aria-required to `true`
   */
  required: PropTypes.bool,
  /**
   * The select element to render. *Must* be a `<select></select>` element.
   * Useful when you need to customize input styles or attributes
   * beyound those that are explicitly supported.
   * Note: any children will be ignored in favor of root children.
   */
  select: PropTypes.element,
  /**
   * When the select is presented as a scrolling list box (e.g. when multiple=true),
   * this attribute represents the number of rows in the list that should be visible at one time.
   */
  size: PropTypes.number,
  /**
   * Styles to set on the root node
   */
  style: PropTypes.object,
  /**
   * Tabindex to set on select element
   */
  tabIndex: PropTypes.number,
  /**
   * Determines if the Select should have a transparent background
   */
  transparent: PropTypes.bool,
  /**
   * Select value attribute
   */
  value: PropTypes.string,
}

export default Select
