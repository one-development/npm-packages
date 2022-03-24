import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import partition from '../utils/partition'
import resets from '../utils/styleResets'
import useEventCallback from '../utils/useEventCallback'
import useFocusVisible from '../utils/useFocusVisible'
import useForkRef from '../utils/useForkRef'
import useValidation from '../utils/useValidation'
import useWatcher from '../utils/useWatcher'
import Text from '../Text'

const rootSize = '36px'
const radioSize = '18px'

const Root = styled.div(({ styleProps }) => ({
  ...resets,
  backgroundColor: 'transparent',
  display: 'grid',
  flex: '0 0 auto',
  gridTemplateAreas: `
    "input label"
    "input description"
  `,
  gridTemplateColumns: `${radioSize} auto`,
  gridTemplateRows: `${styleProps.hasDescription ? radioSize : rootSize} auto`,
  minHeight: rootSize,
  position: 'relative',
  ...(styleProps.inline && {
    display: 'inline-grid',
  }),
}))

const Control = styled.div(({ styleProps }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  gridArea: 'input',
  height: styleProps.condensed ? radioSize : rootSize,
  position: 'relative',
  width: radioSize,
  // eslint-disable-next-line sort-keys
  'input[type=radio]': {
    cursor: 'pointer',
    fontSize: '1rem', // 16px min to prevent iOS Safari zoom on focus
    gridArea: 'input',
    height: radioSize,
    margin: 0,
    opacity: 0,
    width: radioSize,
    zIndex: 1,
    // eslint-disable-next-line sort-keys
    '&[disabled]': {
      cursor: 'not-allowed',
    },
  },
}))

const ControlFill = styled.span(({ theme, styleProps }) => ({
  backgroundColor: 'transparent',
  border: theme.borders.thick,
  borderColor: theme.colors.onSurface.secondary,
  borderRadius: theme.radii.circular,
  cursor: 'pointer',
  height: radioSize,
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: `calc((100% - ${radioSize}) / 2)`,
  transition: theme.transitions.create('all', {
    duration: theme.transitions.durations.shortest,
  }),
  width: radioSize,
  /**
   * NOTE: the following modifiers are listed in order
   * based on which states have least to most precedence.
   */
  [`${Control}:hover &`]: {
    borderColor: theme.colors.onSurface.primary,
  },
  // eslint-disable-next-line sort-keys
  'input[type=radio]:checked + &': {
    borderColor: theme.colors.onSurface.primary,
    borderWidth: 6,
  },
  ...(styleProps.focusVisible && {
    boxShadow: `0 0 0 3px ${theme.colors.onSurface.divider}`,
    transform: 'scale(1.1)',
  }),
  ...(styleProps.invalid && {
    borderColor: theme.colors.error,
    [`${Control}:hover &`]: {
      borderColor: theme.colors.onSurface.primary,
    },
    'input[type=radio]:checked + &': {
      borderWidth: 6,
    },
  }),
  // Override all the other styles
  ...(styleProps.disabled && {
    borderColor: theme.colors.onSurface.disabled,
    boxShadow: 'none',
    cursor: 'not-allowed',
    pointerEvents: 'all',
    transform: 'none',
    [`${Control}:hover &`]: {
      borderColor: theme.colors.onSurface.disabled,
    },
    // eslint-disable-next-line sort-keys
    'input[type=radio]:checked + &': {
      borderColor: theme.colors.onSurface.disabled,
      borderWidth: 6,
    },
  }),
}))

const Label = styled.div(({ theme, styleProps }) => ({
  alignItems: 'center',
  display: 'flex',
  gridArea: 'label',
  height: '100%',
  overflow: 'hidden',
  paddingLeft: theme.space.sm,
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  ...(styleProps.disabled && {
    color: theme.colors.onSurface.disabled,
  }),
}))

const Description = styled.div(({ theme }) => ({
  gridArea: 'description',
  marginTop: theme.space.sm,
  paddingLeft: theme.space.sm,
}))

const Radio = forwardRef((props, forwardedRef) => {
  const {
    'aria-autocomplete': ariaAutoComplete,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    // aria-hidden is stripped from props to avoid it being set on focusable elements
    'aria-hidden': ariaHidden,
    'aria-labelledby': ariaLabelledBy,
    as,
    autoComplete,
    autoFocus,
    checked,
    className,
    defaultChecked,
    description,
    disabled,
    form,
    formNoValidate,
    id,
    inline,
    input,
    invalid: hasInvalidProp,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    onInvalid,
    onValidate,
    required,
    style,
    tabIndex,
    value,
    ...rest
  } = props
  const hasDescription = Boolean(description)
  const descriptionId = `${id || value}-description`

  const hasLabel = Boolean(label)
  const labelId = `${id || value}-label`

  // The Radio depends on useFocusVisible to avoid displaying focus styles on click
  const {
    createBlurHandler,
    createFocusHandler,
    isFocusVisible,
    register: focusVisibleRef,
  } = useFocusVisible()

  // The Radio depends on useValidation to support HTML validation events properly
  const {
    createChangeHandler,
    createInvalidHandler,
    isInvalid: hasValidationError,
    register: validationRef,
  } = useValidation()

  // Determine if input styling is based on HTML validation or invalid prop
  const invalid = formNoValidate ? hasInvalidProp : hasValidationError

  // Create event handlers for the input element
  const handleBlur = useEventCallback(createBlurHandler(onBlur))
  const handleFocus = useEventCallback(createFocusHandler(onFocus))
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

  // We depend on useForkRef to collapse all of our refs into a single ref for the input
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
      styleProps={{ hasDescription, inline }}
    >
      <Control
        styleProps={{ condensed: hasDescription, validate: !formNoValidate }}
      >
        {React.cloneElement(input, {
          ...ariaProps,
          'aria-autocomplete': ariaAutoComplete,
          'aria-describedby': hasDescription ? descriptionId : ariaDescribedBy,
          'aria-disabled': disabled,
          'aria-errormessage': ariaErrorMessage,
          'aria-invalid': invalid,
          'aria-labelledby': hasLabel ? labelId : ariaLabelledBy,
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
          role: 'radio',
          tabIndex,
          type: 'radio',
          value,
          ...input.props,
        })}
        <ControlFill
          aria-hidden='true'
          as='span'
          styleProps={{
            disabled,
            focusVisible: isFocusVisible,
            invalid,
          }}
        />
      </Control>
      {label && (
        <Label as='label' id={labelId} htmlFor={id} styleProps={{ disabled }}>
          <Text
            as='span'
            color='inherit'
            truncate
            variant='body'
            weight={hasDescription ? 'boldest' : 'regular'}
          >
            {label}
          </Text>
        </Label>
      )}
      {description && (
        <Description
          as={Text}
          forwardedAs='div'
          id={descriptionId}
          color={disabled ? 'onSurface.disabled' : 'onSurface.primary'}
          variant='caption'
        >
          {description}
        </Description>
      )}
    </Root>
  )
})

Radio.displayName = 'Radio'
Radio.defaultProps = {
  as: 'div',
  autoComplete: 'on',
  autoFocus: false,
  disabled: false,
  formNoValidate: true,
  inline: false,
  input: <input />,
  invalid: false,
  required: true,
}
Radio.propTypes = {
  'aria-autocomplete': PropTypes.string,
  /**
   * When a description is provided, this will be set to the ID of the description element.
   * You can override value this when using custom description markup.
   */
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  /**
   * @ignore
   */
  'aria-hidden': PropTypes.string,
  /**
   * When a label is provided, this will be set to the ID of the label element.
   * You can override value this when using custom label markup.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * The component used for the root element
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
   * Determines if the radio is selected
   */
  checked: PropTypes.bool,
  className: PropTypes.string,
  /**
   * The radio will default to its selected state. Used for the default option in a set.
   * Note: [RadioGroup](/?path=/story/components-radiogroup--basic) will set this to `true`
   * based on its `defaultValue` prop, but you must set it yourself when using
   * a Radio outside the context of a RadioGroup.
   */
  defaultChecked: PropTypes.bool,
  /**
   * Sets the text of the description under the label. Typically will be plain text,
   * but can accept custom nodes as well.
   * Note: a [Text](/?path=/docs/components-text--basic) component is rendered around
   * any custom nodes, so restrict usage to elements that are valid
   * descendents of `span`.
   */
  description: PropTypes.node,
  /**
   * Determines if the radio should use disabled styling
   */
  disabled: PropTypes.bool,
  /**
   * Input `form` attribute. Associates the input with a form element
   */
  form: PropTypes.string,
  /**
   * Input formnovalidate attribute. Also determines if the input
   * will apply error styling for :invalid pseudo class.
   * NOTE: This prop will be set automatically by the parent RadioGroup,
   * but you can set it yourself when using a Radio outside of a RadioGroup.
   */
  formNoValidate: PropTypes.bool,
  /**
   * Sets the id attribute on the input element
   */
  id: PropTypes.string.isRequired,
  /**
   * Set to `true` when the radio will be rendered in a single row
   */
  inline: PropTypes.bool,
  /**
   * The input element to render. *Must* be an `<input />` element.
   * Useful when you need to customize input styles or attributes
   * beyound those that are explicitly supported.
   */
  input: PropTypes.node,
  /**
   * Applies invalid state styling and sets aria-invalid attribute to `true`.
   * Note: This prop will be set automatically by the parent RadioGroup,
   * but you can set it yourself when using a Radio outside of a RadioGroup.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the text of the associated label element. Typically will be plain text,
   * but can accept custom nodes as well for use-cases like rendering an icon.
   * Note: a [Text](/?path=/docs/components-text--basic) component is rendered around
   * any custom nodes, so restrict usage to elements that are valid
   * descendents of `label` and `span`.
   */
  label: PropTypes.node,
  /**
   * Specifies the name of the input element. Note: this prop will be
   * set automatically by the parent RadioGroup, but it can also be
   * specified explicitly when a Radio is used outside of a RadioGroup.
   * It is required when the Radio is used outside of a RadioGroup.
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
   * Called when input invalid event is triggered.
   *
   * @param {object} event The event source of the callback.
   */
  onInvalid: PropTypes.func,
  /**
   * Called when the input validity state changes. Useful to coordinate styling with native input validation.
   *
   * @param {boolean} valid Represents whether or not the input is valid
   */
  onValidate: PropTypes.func,
  /**
   * Applies required state styling and sets aria-required to `true`.
   * Note: this prop will be set automatically by the parent RadioGroup,
   * but it can also be specified explicitly when a Radio is used outside
   * of a RadioGroup.
   */
  required: PropTypes.bool,
  /**
   * Styles to apply to the root node
   */
  style: PropTypes.object,
  /**
   * Tabindex to set on input element
   */
  tabIndex: PropTypes.number,
  /**
   * The value for the radio input
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Radio
