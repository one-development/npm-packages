import _ from 'lodash'

export default function createTransitions() {
  const easings = {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  }

  easings.use = (type = 'easeInOut') => {
    if (!easings[type])
      throw new Error(`Invalid type: "${type}" is not a valid easing`)
    return easings[type]
  }

  const durations = [0, 150, 200, 250, 300, 375]
  /* eslint-disable prefer-destructuring */
  durations.none = durations[0]
  durations.shortest = durations[1]
  durations.shorter = durations[2]
  durations.short = durations[3]
  durations.standard = durations[4]
  durations.complex = durations[5]
  /* eslint-enable prefer-destructuring */
  durations.use = (type = 'standard') => {
    if (!durations[type])
      throw new Error(`Invalid type: "${type}" is not a valid duration`)
    return durations[type]
  }

  const transitions = { durations, easings }

  transitions.create = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = durations.standard,
      easing: easingOption = easings.easeInOut,
      delay: delayOption = 0,
      ...other
    } = options

    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') {
      if (!_.isString(props) && !_.isArray(props))
        console.error('One UI: "props" must be a string or Array.')

      if (!_.isNumber(durationOption) && !_.isString(durationOption))
        console.error(
          `One UI: "duration" must be a number or a string but found ${durationOption}.`
        )

      if (!_.isString(easingOption))
        console.error('One UI: "easing" must be a string.')

      if (!_.isNumber(delayOption) && !_.isString(delayOption))
        console.error('One UI: "delay" must be a number or a string.')

      if (Object.keys(other).length !== 0)
        console.error(
          `One UI: unrecognized argument(s) [${Object.keys(other).join(',')}]`
        )
    }
    /* eslint-enable no-console */

    const delay = _.isString(delayOption) ? delayOption : formatMs(delayOption)
    const duration = _.isString(durationOption)
      ? durationOption
      : formatMs(durationOption)

    return []
      .concat(props)
      .map(animatedProp => {
        const animated = _.kebabCase(_.kebabCase(animatedProp))
        return `${animated} ${duration} ${easingOption} ${delay}`
      })
      .join(',')
  }

  return transitions
}

function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`
}
