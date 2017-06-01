'use strict'

/**
 * Deviders by number size
 * @constant
 * @private
 */
const dividers = {
  'thousand': 1e3,
  'million': 1e6,
  'billion': 1e9,
  'trillion': 1e12
}

/**
 * lengthes of zeros
 */
const lengthes = {
  'thousand': 3,
  'million': 6,
  'billion': 9,
  'trillion': 12
}

/**
 * Units
 */
const units = ['thousand', 'million', 'billion', 'trillion']

const styles = {}
let currentStyle = null
let defaultStyle = null

/**
 * Adds a style
 * @param {Array<String>} style - an array with four or more strings
 * @example
 * addStyle('metric', ['k', 'M', 'G', 'T'])
 * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
 */
const addStyle = (name, symbols = []) => {
  const metric = ['k', 'M', 'G', 'T']
  const style = {
    'thousand': symbols[0] || metric[0],
    'million': symbols[1] || metric[1],
    'billion': symbols[2] || metric[2],
    'trillion': symbols[3] || metric[3]
  }
  styles[name] = style
  return style
}

const getStyle = (name) => {
  return styles[name]
}

const setStyle = (name) => {
  currentStyle = name
}

const setDefaultStyle = (name) => {
  defaultStyle = currentStyle = name
  return getStyle(name)
}

const getCurrentStyle = () => {
  return getStyle(currentStyle) || getStyle(defaultStyle)
}

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
 * Returns a symbol by a group
 * @param {String} group - a group ('thousand', 'million', etc)
 * @param {String} style - a style
 * @returns {String}
 */
const getSymbolByGroup = (group, style = defaultStyle) => {
  return getStyle(style)[group]
}

/**
 * Returns the symbol of a number by a style
 * @param {Number} number - a number
 * @param {String} style - a style name for formatting
 * @returns {String}
 */
const getSymbol = (number, style = defaultStyle) => {
  const group = getNumberGroup(number)
  return getSymbolByGroup(group, style)
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

/**
 * Formats a number
 * @param {Number} number - a number
 * @param {Object} options - options object
 * @param {String} options.measurement - a fixed number group (like formatting a million with a thousands format)
 * @param {Number} options.precision - a precision after the dot (the difference between 2K and 2.56K)
 * @returns {String} - the formatted number
 */
const format = (number, options = {}) => {
  const formatted = number / getDivider(options.measurement ? options.measurement : number)
  const fixed = toFixed(formatted, options.precision || 0)
  const symbol = (options.measurement ? getSymbolByGroup(options.measurement) : getSymbol(number, options.style))
  return fixed + symbol
}

class NumberSuffix {
}

NumberSuffix.addStyle = addStyle
NumberSuffix.getStyle = getStyle
NumberSuffix.getDivider = getDivider
NumberSuffix.format = format
NumberSuffix.styles = styles
NumberSuffix.toFixed = toFixed
NumberSuffix.format = format

/**
 * Initialization:
 */
addStyle('metric', ['k', 'M', 'G', 'T'])
addStyle('abbreviation', ['K', 'M', 'B', 'T'])
setDefaultStyle('metric')

module.exports = NumberSuffix
