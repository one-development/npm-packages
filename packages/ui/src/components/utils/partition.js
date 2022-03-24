import _ from 'lodash'
/**
 * Takes an object and returns an array with two objects, including keys/values that passed
 * and failed predicate, respectively.
 *
 * @param   {object|array}  collection        the object to partition
 * @param   {function}  predicate  tests each entry. receives value, key and returns true/false
 *
 * @return  {array}             an array containing two entries: passes and failures
 */
export default function paritition(collection, predicate) {
  const extend = (items, item, key) =>
    _.isArray(items) ? [...items, item] : { ...items, [key]: item }

  const partitions = _.isArray(collection) ? [[], []] : [{}, {}]
  return _.reduce(
    collection,
    ([passed, failed], value, key) => {
      return predicate(value, key)
        ? [extend(passed, value, key), failed]
        : [passed, extend(failed, value, key)]
    },
    partitions
  )
}
