/* eslint-disable max-lines */
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import VisibilityIcon from '../../icons/Visibility'
import VisibilityOffIcon from '../../icons/VisibilityOff'
import resets from '../utils/styleResets'
import ButtonBase from '../ButtonBase'
import applyMask from '../utils/applyMask'
import ExtraPropTypes from '../utils/ExtraPropTypes'
import partition from '../utils/partition'
import px from '../utils/px'
import useEventCallback from '../utils/useEventCallback'
import useFocusVisible from '../utils/useFocusVisible'
import useForkRef from '../utils/useForkRef'
import useValidation from '../utils/useValidation'
import useWatcher from '../utils/useWatcher'

const supportedTypes = [
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'tel',
  'text',
  'time',
  'url',
  'week',
]

// these selectors are needed to override browser styling when autofilling
const inputAutofillSelectors = [
  'input:-webkit-autofill',
  'input:-webkit-autofill:hover',
  'input:-webkit-autofill:focus',
  'input:-webkit-autofill:active',
  'input:-webkit-autofill::first-line',
].join(',')

const Root = styled.div(({ theme, styleProps }) => {
  const {
    disabled,
    focused,
    hasEndAdornment,
    hasStartAdornment,
    invalid,
    fullWidth,
    maskedValue,
    transparent,
  } = styleProps
  const normalPadding = px.toNumber(theme.space.sm)
  const borderWidthDiff =
    px.toNumber(theme.borderWidths.thick) - px.toNumber(theme.borderWidths.thin)

  return {
    ...resets,
    alignItems: 'center',
    backgroundColor: transparent ? 'transparent' : theme.colors.surface,
    border: theme.borders.thin,
    borderColor: theme.colors.onSurface.divider,
    borderRadius: theme.radii.sm,
    color: theme.colors.onSurface.primary, // set color here to allow child elements to inherit
    cursor: 'text',
    display: fullWidth ? 'flex' : 'inline-flex',
    flex: fullWidth ? '1 0 auto' : '0 0 auto',
    fontFamily: 'inherit',
    fontSize: '1rem', // a min size of 16px is required to prevent safari zoom on focus
    height: theme.sizes.inputHeight,
    // We have to target the <input/> element because we can't render a styled component
    input: {
      ...resets,
      appearance: 'none',
      backgroundColor: 'transparent',
      border: 0,
      color: maskedValue && !focused ? 'transparent' : 'currentColor',
      display: 'block',
      flex: '1 1 auto',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      height: '100%',
      minWidth: 0,
      opacity: maskedValue && !focused ? 0 : 1,
      outline: 'none',
      /* eslint-disable sort-keys */
      '&::placeholder': {
        color: theme.colors.onSurface.hint,
        opacity: 1, // override Firefox opacity
      },
      ...(hasEndAdornment && {
        marginRight: theme.space.sm,
      }),
      ...(hasStartAdornment && {
        marginLeft: theme.space.sm,
      }),
    },
    // before applying autofill styles we'll check to see if the browser supports them
    '@supports selector(:-webkit-autofill)': {
      [inputAutofillSelectors]: {
        /**
         * current implementation uses a transition-delay to prevent `background-color` and `color` from changing
         * since they can't be overriden. There is another approach (commented out) that can be used, however
         * since the input component currently supports a `transparent` prop, this approach does not work
         */
        // '-webkit-text-fill-color': maskedValue && !focused
        //   ? 'transparent'
        //   : theme.colors.onSurface.primary,
        // boxShadow: `0 0 0 100px ${theme.colors.surface} inset`,
        fontFamily: theme.fonts.text.family,
        fontSize: '1rem',
        // backgroundColor and color can't be overriden so we just delay the style change for a long time
        // (also yes, scientific notation is supported)
        transition:
          'background-color 1e9s ease-in-out 1e9s, color 1e9s ease-in-out 1e9s',
      },
    },
    /* eslint-enable sort-keys */
    maxWidth: '100%',
    minWidth: '250px', // browser default
    outline: `${px(borderWidthDiff)} solid gray`,
    outlineColor: 'transparent',
    padding: `0 ${px(normalPadding + borderWidthDiff)}`,
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    ...(disabled && {
      backgroundColor: theme.colors.onSurface.divider,
      cursor: 'not-allowed',
      opacity: 0.5,
    }),
    ...(fullWidth && {
      minWidth: 0,
      width: '100%',
    }),
    ...(invalid && {
      borderColor: theme.colors.error,
    }),
    // eslint-disable-next-line sort-keys
    '&:focus-within': {
      border: theme.borders.thick,
      borderColor: invalid ? theme.colors.error : theme.colors.highlight,
      padding: `0 ${px(normalPadding)}`,
    },
  }
})

const Mask = styled.div(({ theme, styleProps }) => {
  const { hasStartAdornment, hasEndAdornment } = styleProps
  const normalPadding = px.toNumber(theme.space.sm)
  const borderWidthDiff =
    px.toNumber(theme.borderWidths.thick) - px.toNumber(theme.borderWidths.thin)

  return {
    ...resets,
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    color: 'currentColor',
    display: 'flex',
    flex: '1 1 auto',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    left: hasStartAdornment ? theme.space.sm : 0,
    padding: `0 ${px(normalPadding + borderWidthDiff)}`,
    pointerEvents: 'none',
    position: 'absolute',
    right: hasEndAdornment ? theme.space.sm : 0,
    top: 0,
  }
})

const StartAdornment = styled.div({
  display: 'flex',
})

const EndAdornment = styled.div({
  display: 'flex',
})

const PasswordButton = styled.div(({ theme, styleProps }) => ({
  ...(styleProps.isFocusVisible && {
    backgroundColor: theme.colors.state('focused'),
    borderRadius: theme.radii.lg,
    boxShadow: `0 0 0 3px ${theme.colors.state('focused')}`,
    transform: 'scale(1.1)',
  }),
}))

const Input = forwardRef((props, forwardedRef) => {
  const {
    'aria-autocomplete': ariaAutoComplete,
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    // Remove Aria-hidden, which should not be set on focusable elements
    'aria-hidden': ariaHidden,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    as,
    autoComplete: autoCompleteProp,
    autoCorrect,
    autoFocus,
    className,
    defaultValue,
    disabled,
    endAdornment,
    form,
    formNoValidate,
    fullWidth,
    id,
    input,
    inputMode,
    invalid: hasInvalidProp,
    max,
    maxLength,
    min,
    minLength,
    name,
    list,
    onBlur,
    onChange,
    onFocus,
    onInvalid,
    onInput,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onValidate,
    mask,
    multiple,
    pattern,
    placeholder,
    readOnly,
    required,
    startAdornment,
    step,
    style,
    tabIndex: tabIndexProp,
    transparent,
    type: typeProp,
    value,
    ...rest
  } = props

  // Reconcile HTML form validation state with invalid prop
  const {
    createChangeHandler,
    createInvalidHandler,
    isInvalid: hasValidationError,
    register: validationRef,
  } = useValidation({ mode: 'onSubmit' })

  // Report any changes to validity state via the onValidate prop
  useWatcher(hasValidationError, hasError => {
    const valid = !hasError

    if (onValidate) {
      onValidate(valid)
    }
  })

  // With useForkRef we can combine our internal ref with other forwarded refs
  const inputRef = useRef(null)
  const forwardedRefs = useForkRef(forwardedRef, validationRef)
  const ref = useForkRef(inputRef, forwardedRefs)

  // Determine a few characteristics about the input
  const controlled = _.has(props, 'value')
  const [focused, setFocused] = useState(false)
  const invalid = formNoValidate ? hasInvalidProp : hasValidationError

  // Create necessary event handlers for the input element
  const handleInvalid = useEventCallback(createInvalidHandler(onInvalid))
  const handleChange = useEventCallback(createChangeHandler(onChange))

  const handleBlur = useEventCallback(e => {
    setFocused(false)

    if (onBlur) {
      onBlur(e)
    }
  })

  const handleFocus = useEventCallback(e => {
    setFocused(true)

    if (onFocus) {
      onFocus(e)
    }
  })

  // Create event handlers for password adornment
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const {
    createBlurHandler: createPasswordButtonBlurHandler,
    createFocusHandler: createPasswordButtonFocusHandler,
    isFocusVisible: isPasswordButtonFocusVisible,
    register: passwordButtonRef,
  } = useFocusVisible()
  const handlePasswordButtonBlur = useEventCallback(
    createPasswordButtonBlurHandler()
  )
  const handlePasswordButtonFocus = useEventCallback(
    createPasswordButtonFocusHandler()
  )
  const handlePasswordButtonClick = useCallback(() => {
    setIsPasswordVisible(prev => !prev)
  }, [])

  // Determine tabindex for input
  const tabIndex = !_.isNil(tabIndexProp)
    ? tabIndexProp
    : disabled
    ? -1
    : undefined

  // Determine which type attribute to apply
  const type = (() => {
    if (!supportedTypes.includes(typeProp)) return Input.defaultProps.type
    // When the password is being shown, we have to use type=text to make the characters visible
    if (typeProp === 'password' && isPasswordVisible) return 'text'
    return typeProp
  })()

  // Determine which autocomplete attribute to apply
  const autoComplete = (() => {
    if (typeProp !== 'password') return autoCompleteProp
    if (isPasswordVisible) return 'disabled'
    if (autoCompleteProp === Input.defaultProps.autoComplete)
      return 'new-password'
    return autoCompleteProp
  })()

  // Determine if the input masked value should be displayed
  const refValue = _.get(inputRef, 'current.value')
  const rawValue = controlled ? value : refValue
  const maskedValue = useMemo(() => {
    if (!mask || typeProp === 'password') return null
    if (_.isEmpty(rawValue)) return null
    return applyMask(mask, rawValue)
  }, [rawValue, mask, typeProp])

  // Determine which adornments to display
  const hasPasswordIcon = typeProp === 'password'
  const hasEndAdornment = typeProp !== 'password' && Boolean(endAdornment)
  const hasStartAdornment = Boolean(startAdornment)
  const PasswordIcon = isPasswordVisible ? VisibilityOffIcon : VisibilityIcon

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
        focused,
        fullWidth,
        hasEndAdornment,
        hasStartAdornment,
        invalid,
        maskedValue,
        transparent,
      }}
    >
      {hasStartAdornment && <StartAdornment>{startAdornment}</StartAdornment>}
      {React.cloneElement(input, {
        ...ariaProps,
        'aria-autocomplete': ariaAutoComplete,
        'aria-controls': ariaControls,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': disabled,
        'aria-errormessage': ariaErrorMessage,
        'aria-invalid': invalid,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-required': required,
        autoComplete,
        autoCorrect,
        autoFocus,
        defaultValue,
        disabled,
        form,
        id,
        inputMode,
        list,
        max,
        maxLength,
        min,
        minLength,
        multiple,
        name,
        onBlur: handleBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        onInput,
        onInvalid: handleInvalid,
        onKeyDown,
        onKeyPress,
        onKeyUp,
        pattern,
        placeholder,
        readOnly,
        ref,
        required,
        step,
        tabIndex,
        type,
        ...(controlled && {
          value: _.isNil(value) ? '' : value,
        }),
        ...input.props,
      })}
      {maskedValue && !focused && (
        <Mask
          aria-hidden
          styleProps={{
            hasEndAdornment,
            hasStartAdornment,
          }}
        >
          {maskedValue}
        </Mask>
      )}
      {hasPasswordIcon && (
        <EndAdornment>
          <PasswordButton
            as={ButtonBase}
            aria-label={
              isPasswordVisible ? 'Hide password text' : 'Show password text'
            }
            onClick={handlePasswordButtonClick}
            onBlur={handlePasswordButtonBlur}
            onFocus={handlePasswordButtonFocus}
            ref={passwordButtonRef}
            styleProps={{ isFocusVisible: isPasswordButtonFocusVisible }}
          >
            <PasswordIcon scalable={false} size='16px' />
          </PasswordButton>
        </EndAdornment>
      )}
      {hasEndAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
    </Root>
  )
})

const { mask, regex } = ExtraPropTypes

Input.displayName = 'Input'
Input.defaultProps = {
  as: 'div',
  autoComplete: 'on',
  autoCorrect: 'off',
  autoFocus: false,
  disabled: false,
  formNoValidate: true,
  fullWidth: true,
  input: <input />,
  invalid: false,
  onBlur: () => {},
  required: true,
  transparent: false,
  type: 'text',
}
Input.propTypes = {
  'aria-autocomplete': PropTypes.string,
  'aria-controls': PropTypes.string,
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
   * Determines if iOS safari keyboard should autocorrect.
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocorrect)
   */
  autoCorrect: PropTypes.oneOf(['on', 'off']),
  /**
   * Determines if the input should focus on load
   */
  autoFocus: PropTypes.bool,
  /**
   * Classname to set on the root element
   */
  className: PropTypes.string,
  /**
   * Sets the initial value on the input
   */
  defaultValue: PropTypes.string,
  /**
   * Determines if the input is disabled
   */
  disabled: PropTypes.bool,
  /**
   * A node that gets placed to the right of the input. If type is set to `password`,
   * then endAdornment will be set to the password icon.
   */
  endAdornment: PropTypes.node,
  /**
   * Input `form` attribute. Associates the input with a form element
   */
  form: PropTypes.string,
  /**
   * Input formnovalidate attribute. Also determines if the input
   * will apply error styling for :invalid pseudo class.
   * NOTE: In accordance with HTML semantics, this prop is not spread
   * to the input element because type is not "submit" or "image".
   */
  formNoValidate: PropTypes.bool,
  /**
   * Determines if the input should grow to fill its parents width
   */
  fullWidth: PropTypes.bool,
  /**
   * Input id attribute
   */
  id: PropTypes.string.isRequired,
  /**
   * The input node to render. *Must* be an `<input />` element.
   * Useful when you need to customize input styles or attributes
   * beyound those that are explicitly supported.
   */
  input: PropTypes.node,
  /**
   * Hints at data that might be entered by the user.
   */
  inputMode: PropTypes.string,
  /**
   * Applies invalid state styling and sets aria-invalid attribute to `true`
   */
  invalid: PropTypes.bool,
  /**
   * Input list attribute. Should be the id of a `datalist` element located in the same document.
   */
  list: PropTypes.string,
  /**
   * A pattern to use for visually formatting the input's value (e.g. ###-###-####).
   * Use the "#" character to denote user inputted values and other characters (except "_")
   * to denote delimiters.
   * <br/>Notes:
   * <br/>-Mask must include at least one #, must not include _, and must end with #
   * <br/>-Mask is displayed on blur and it is hidden on focus
   * <br/>-Mask will not affect the value that is submitted or announced by screen readers
   */
  mask,
  /**
   * Input max attribute. Determines max value to allow when input type=number.
   */
  max: PropTypes.string,
  /**
   * Input maxlength attribute. Determines maximum number of characters to allow.
   */
  maxLength: PropTypes.string,
  /**
   * Input min attribute. Determines min value to allow when input type=number.
   */
  min: PropTypes.string,
  /**
   * Input minLength attribute. Determines minimum number of characters to allow.
   */
  minLength: PropTypes.string,
  /**
   * Input multiple attribute. Only applicable when `type=email`.
   */
  multiple: PropTypes.bool,
  /**
   * Input name attribute
   */
  name: PropTypes.string.isRequired,
  /**
   * Called when the input is blur event is triggered
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
   * Called when the input focus event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onFocus: PropTypes.func,
  /**
   * Called when input event is triggered.
   *
   * @param {object} event The event source of the callback.
   */
  onInput: PropTypes.func,
  /**
   * Called when input invalid event is triggered.
   *
   * @param {object} event The event source of the callback.
   */
  onInvalid: PropTypes.func,
  /**
   * Called when the input keydown event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onKeyDown: PropTypes.func,
  /**
   * Called when the input keypress event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onKeyPress: PropTypes.func,
  /**
   * Called when the input keyup event is triggered
   *
   * @param {object} event The event source of the callback.
   */
  onKeyUp: PropTypes.func,
  /**
   * Called when the input validity state changes.
   * Useful to coordinate styling when using `formNoValidate={false}` for
   * native input validation.
   *
   * @param {boolean} valid Represents whether or not the input is valid
   */
  onValidate: PropTypes.func,
  /**
   * Input regex attribute.
   * Used to validate the value of the input on form submission
   */
  pattern: regex,
  /**
   * Sets the input's placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Determines if the input value is editable and applies
   * readOnly styling. Note: unlike disabled, value is still
   * included on form submission.
   */
  readOnly: PropTypes.bool,
  /**
   * Input required attribute. Applies required styling
   * and sets aria-required to `true`.
   */
  required: PropTypes.bool,
  /**
   * A node that gets placed to the left of the input
   */
  startAdornment: PropTypes.node,
  /**
   * Step to increment when type=number.
   */
  step: PropTypes.number,
  /**
   * Styles to apply to the root node
   */
  style: PropTypes.object,
  /**
   * TabIndex to provide to input element.
   */
  tabIndex: PropTypes.number,
  /**
   * Determines if the Input should have a transparent background
   */
  transparent: PropTypes.bool,
  /**
   * Input type attribute. If type is set to `password`, then endAdornment
   * will be set to the password icon.
   */
  type: PropTypes.oneOf(supportedTypes),
  /**
   * Input value attribute
   */
  value: PropTypes.string,
}

export default Input
