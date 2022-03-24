export default function createPropType(type, validator) {
  const createError = (propName, componentName) =>
    new Error(
      [
        `Non-${type} prop ${propName} supplied to `,
        `\`${componentName}\`. Validation failed.`,
      ].join('')
    )

  const validatePropType = (props, propName, componentName) => {
    if (validator(props[propName])) return undefined
    return createError(type, propName, componentName)
  }

  const propType = (props, propName, componentName) => {
    if (!props[propName]) return undefined
    return validatePropType(props, propName, componentName)
  }

  propType.isRequired = validatePropType
  Object.defineProperty(propType, 'name', { value: type })

  return propType
}
