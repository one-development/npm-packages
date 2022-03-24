import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import CheckIcon from '../../icons/Check'
import ExtraPropTypes from '../utils/ExtraPropTypes'
import partition from '../utils/partition'
import resets from '../utils/styleResets'
import useEventCallback from '../utils/useEventCallback'
import useFocusVisible from '../utils/useFocusVisible'
import useForkRef from '../utils/useForkRef'
import useValidation from '../utils/useValidation'
import useWatcher from '../utils/useWatcher'
import Text from '../Text'

const rootSize = '36px'
const inputSize = '18px'

const Root = styled.div(({ styleProps }) => ({
  ...resets,
  backgroundColor: 'transparent',
  display: 'flex',
  flex: styleProps.fullWidth ? '1 0 auto' : '0 0 auto',
  flexDirection: styleProps.labelPosition === 'end' ? 'row' : 'row-reverse',
  justifyContent:
    styleProps.labelPosition === 'end' ? 'flex-start' : 'flex-end',
  maxWidth: '100%',
  minHeight: rootSize,
  minWidth: 0,
  padding: `calc((${rootSize} - ${inputSize}) / 2) 0`,
  position: 'relative',
}))

const Control = styled.div({
  backgroundColor: 'transparent',
  flex: '0 0 auto',
  height: inputSize,
  position: 'relative',
  width: inputSize,
  // eslint-disable-next-line sort-keys
  'input[type=checkbox]': {
    cursor: 'pointer',
    focusRing: 'none',
    fontSize: '1rem', // 16px min to prevent iOS safari zoom on focus
    height: inputSize,
    margin: 0,
    opacity: 0,
    width: inputSize,
    zIndex: 1,
    // eslint-disable-next-line sort-keys
    '&[disabled]': {
      cursor: 'not-allowed',
    },
  },
})

const ControlCheck = styled.div(({ theme, styleProps }) => {
  const { color, disabled, invalid, isFocusVisible } = styleProps
  const checkColor =
    color === 'neutral' ? theme.colors.surface : theme.colors.on(color)
  const backgroundColor = _.get(
    {
      brand: theme.colors.brand,
      brand2: theme.colors.brand2,
      neutral: theme.colors.onSurface.primary,
    },
    [color],
    color
  )

  return {
    alignItems: 'center',
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    border: theme.borders.thin,
    borderRadius: theme.radii.sm,
    bottom: 0,
    color: 'transparent',
    display: 'flex',
    fontSize: inputSize, // for icon
    height: inputSize,
    justifyContent: 'center',
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.durations.shortest,
    }),
    width: inputSize,
    /**
     * NOTE: the following modifiers are listed in order
     * based on which states have least to most precedence.
     */
    // eslint-disable-next-line sort-keys
    'input[type=checkbox]:checked + &': {
      backgroundColor,
      borderColor: backgroundColor,
      color: checkColor,
    },
    ...(isFocusVisible && {
      boxShadow: `0 0 0 3px ${theme.colors.onSurface.divider}`,
      transform: 'scale(1.1)',
    }),
    // Overwrite all styles when the checkbox is invalid
    ...(invalid && {
      borderColor: theme.colors.error,
      [`input[type=checkbox]:checked + &`]: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
        color: theme.colors.onError.primary,
      },
    }),
    // Overwrite all styles when the checkbox is disabled
    ...(disabled && {
      borderColor: theme.colors.onSurface.divider,
      'input[type=checkbox]:checked + &': {
        backgroundColor: theme.colors.state('disabled'),
        borderColor: 'transparent',
        color: theme.colors.onSurface.disabled,
      },
    }),
  }
})

const Label = styled.div(({ theme, styleProps }) => ({
  alignItems: 'center',
  color: theme.colors.onSurface.primary,
  display: 'flex',
  flex: styleProps.fullWidth ? '1 1 auto' : '0 1 auto',
  justifyContent: styleProps.position === 'end' ? 'flex-end' : 'flex-start',
  marginLeft: styleProps.position === 'end' ? theme.space.sm : 0,
  marginRight: styleProps.position === 'start' ? theme.space.sm : 0,
  minHeight: `calc(${inputSize} - (${theme.space.xs} * 2))`,
  ...(styleProps.disabled && {
    color: theme.colors.onSurface.disabled,
  }),
  padding: `${theme.space.xs} 0`,
}))

const Checkbox = forwardRef((props, forwardedRef) => {
  const {
    'aria-autocomplete': ariaAutoComplete,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-labelledby': ariaLabelledBy,
    // aria-hidden is stripped from props to avoid it being set on focusable elements
    'aria-hidden': ariaHidden,
    as,
    autoComplete,
    autoFocus,
    checked,
    className,
    color,
    defaultChecked,
    disabled,
    form,
    formNoValidate,
    id,
    input,
    invalid: hasInvalidProp,
    label,
    labelPosition,
    fullWidth,
    onBlur,
    onChange,
    onFocus,
    onInvalid,
    onValidate,
    name,
    required,
    style,
    tabIndex,
    value,
    ...rest
  } = props

  const hasLabel = Boolean(label)
  const labelId = `${id || name}-label`
  const labelledBy = hasLabel ? labelId : ariaLabelledBy

  // The Checkbox depends on useFocusVisible to avoid displaying focus styles on click
  const {
    createBlurHandler,
    createFocusHandler,
    isFocusVisible,
    register: focusVisibleRef,
  } = useFocusVisible()

  // The Checkbox depends on useValidation to support HTML validation events properly
  const {
    createChangeHandler,
    createInvalidHandler,
    isInvalid: hasValidationError,
    register: validationRef,
  } = useValidation({ mode: 'onChange' })

  // Determine if input styling is based on HTML validation or invalid prop
  const invalid = formNoValidate ? hasInvalidProp : hasValidationError

  // Create event handlers for the input element
  const handleFocus = useEventCallback(createFocusHandler(onFocus))
  const handleBlur = useEventCallback(createBlurHandler(onBlur))
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

  // We rely on useForkRef to collapse all of our refs into a single ref for the input to use
  const focusRef = useForkRef(forwardedRef, focusVisibleRef)
  const ref = useForkRef(focusRef, validationRef)

  // Spread aria-* props into the input element
  const isAria = (val, prop) => /^aria-.*$/.test(prop)
  const [ariaProps, rootProps] = partition(rest, isAria)

  return (
    <Root
      {...rootProps}
      as={as}
      className={className}
      style={style}
      styleProps={{ fullWidth, labelPosition }}
    >
      <Control>
        {React.cloneElement(input, {
          ...ariaProps,
          'aria-autocomplete': ariaAutoComplete,
          'aria-describedby': ariaDescribedBy,
          'aria-disabled': disabled,
          'aria-errormessage': ariaErrorMessage,
          'aria-invalid': invalid,
          'aria-labelledby': labelledBy,
          'aria-required': required,
          autoComplete,
          autoFocus,
          checked,
          defaultChecked,
          disabled,
          form,
          id,
          name,
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus,
          onInvalid: handleInvalid,
          ref,
          required,
          role: 'checkbox',
          tabIndex,
          type: 'checkbox',
          value,
          ...input.props,
        })}
        <ControlCheck
          styleProps={{
            color,
            disabled,
            invalid,
            isFocusVisible,
          }}
        >
          <CheckIcon color='inherit' size={inputSize} scalable={false} />
        </ControlCheck>
      </Control>
      {hasLabel && (
        <Label
          as='label'
          htmlFor={id}
          id={labelId}
          styleProps={{ disabled, fullWidth, position: labelPosition }}
        >
          <Text as='span' weight='boldest'>
            {label}
          </Text>
        </Label>
      )}
    </Root>
  )
})

Checkbox.displayName = 'Checkbox'
Checkbox.defaultProps = {
  as: 'div',
  autoComplete: 'on',
  autoFocus: false,
  color: 'brand',
  disabled: false,
  formNoValidate: true,
  fullWidth: false,
  input: <input />,
  invalid: false,
  labelPosition: 'end',
  required: true,
}

const { color } = ExtraPropTypes

Checkbox.propTypes = {
  'aria-autocomplete': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  /**
   * @ignore
   */
  'aria-hidden': PropTypes.bool,
  'aria-label': PropTypes.string,
  /**
   * When a label is provided, this will be set to the ID of the label element.
   * You can override value this when using custom label markup or if the label is omitted.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The component used for the input node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Determines if the browser should provide value suggestions
   */
  autoComplete: PropTypes.string,
  /**
   * Determines if the input element should receive focus on load
   */
  autoFocus: PropTypes.bool,
  /**
   * Determines if the Checkbox is checked
   */
  checked: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Determines the color of the component. It supports theme colors that make sense for this component.
   * Note: any custom color supported by https://www.npmjs.com/package/color-string is also accepted.
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['brand', 'brand2', 'neutral']),
    color,
  ]),
  /**
   * The Checkbox will default to its checked state.
   */
  defaultChecked: PropTypes.bool,
  /**
   * Determines if the Checkbox should use disabled styling
   */
  disabled: PropTypes.bool,
  /**
   * Input `form` attribute. Associates the input with a form element
   */
  form: PropTypes.string,
  /**
   * Input formnovalidate attribute. Also determines if the input
   * will apply error styling for :invalid pseudo class.
   */
  formNoValidate: PropTypes.bool,
  /**
   * Determines if the checkbox should grow to fill its parent's width. The label
   * and Checkbox be pushed to opposite ends of the container.
   */
  fullWidth: PropTypes.bool,
  /**
   * Sets the id attribute on the input element
   */
  id: PropTypes.string.isRequired,
  /**
   * The input element to render. *Must* be an `<input />` element.
   * Useful when you need to customize input styles or attributes
   * beyound those that are explicitly supported.
   */
  input: PropTypes.node,
  /**
   * Applies invalid state styling and sets the input element's aria-invalid attribute to `true`.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the text of the associated label element. Typically, should be
   * plain text, but custom nodes are also accepted for advanced use-cases,
   * like rendering an icon.
   * Note: a [Text](/?path=/docs/components-text--basic) component is rendered around
   * any custom nodes, so restrict usage to elements that are valid
   * descendents of `label` and `span`.
   */
  label: PropTypes.node,
  /**
   * Determines where the label text/node should be positioned relative to the checkbox
   */
  labelPosition: PropTypes.oneOf(['start', 'end']),
  /**
   * Specifies the name of the input element
   */
  name: PropTypes.string,
  /**
   * Called when the blur event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the input onChange event is triggered.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
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
  onInvalid: PropTypes.func,
  /**
   * Called when the validity state changes. Useful to coordinate styling with native input validation.
   *
   * @param {boolean} valid Represents whether or not the input is valid
   */
  onValidate: PropTypes.func,
  /**
   * Applies required state styling and sets aria-required to `true`.
   */
  required: PropTypes.bool,
  /**
   * Styles to apply to the root
   */
  style: PropTypes.object,
  /**
   * Tabindex to set on input element
   */
  tabIndex: PropTypes.number,
  /**
   * The value of the input element. Note: when using controlled state (or a form library),
   * it is typically not necessary to set this prop.
   */
  value: PropTypes.string,
}

export default Checkbox
