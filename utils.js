'use strict'

const {dividers, units} = require('./constants')

/**
 * Returns a length of digits for a number.
 * The mathematicle equivalation of String(num).length
 * @param {Number} num - a number
 * @returns {Number} - length
 */
const getNumberLength = (num) => {
  return Number.parseInt((Math.log10(Math.abs(num)) + 1), 10)
}

/**
 * Returns the number group devision for a number
 * @example
 * 'thousand' -> 1,000
 * 'million' -> 1,000,000
 * @param {String} group - a group
 * @returns {Number} - a number to divide with
 */
const getGroupDevision = (group) => {
  return dividers[group.toLowerCase()]
}

/**
 * Return the devision value for formatting numbers
 * @example
 * 1,234 -> 1,000
 * 12,345 -> 1,000
 * 1,234,567 -> 1,000,000
 * 1,234,5678 -> 1,000,000
 * @param {Number} num - a number
 * @returns {Number} - a number to divide with
 */
const getNumberDevider = (num) => {
  const zeros = (getNumberLength(num) - 1)
  if (zeros < 3) {
    return dividers['thousand']
  } else if (zeros > 12) {
    return dividers['trillion']
  }
  return Math.pow(10, (~~(zeros / 3) || 1) * 3)
}

/**
 * Returns a divider by either a number or a string
 * @param {String|Number} num - either a number or a string of thousand, million, billion or trillion. Case insensitive.
 * @returns {Number}
 */
const getDivider = (num) => {
  return typeof num === 'string' ? getGroupDevision(num) : getNumberDevider(num)
}

/**
 * Return the group of the current number
 * @param {Number} num - a number
 * @example
 * 1,000 -> 'thousand'
 * 10,000 -> 'thousand'
 * 10,000,000 -> 'million'
 * @returns {String}
 */
const getNumberGroup = (num) => {
  const devisionZeros = getNumberLength(getNumberDevider(num)) - 1
  return units[(devisionZeros / 3) - 1]
}

/**
 * Returns a fixed number without rounding
 * (native function rounds the value)
 * @param {Number} num - a number
 * @param {Number} decimals - the number of digits after the dot
 * @returns {String}
 */
const toFixed = (num, decimals = 0) => {
  const d = Math.pow(10, decimals)
  return (Number.parseInt(num * d) / d).toFixed(decimals)
}

module.exports = {
  getNumberLength,
  getGroupDevision,
  getNumberDevider,
  getDivider,
  getNumberGroup,
  toFixed
}
