'use strict'

const StyleCollection = require('./styles')
const {getDivider, getNumberGroup, toFixed} = require('./utils')

/**
 * Global style collection object
 */
const styles = new StyleCollection()

/**
 * Adds a style
 * @param {Array<String>} style - an array with four or more strings
 * @example
 * addStyle('metric', ['k', 'M', 'G', 'T'])
 * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
 */
const addStyle = (name, symbols = []) => {
  styles.add(name, symbols)
}

const getStyle = (name) => {
  return styles.get(name)
}

/**
 * Formats a number
 * @param {Number} number - a number
 * @param {Object} options - options object
 * @param {String} options.measurement - a fixed number group (like formatting a million with a thousands format)
 * @param {Number} options.precision - a precision after the dot (the difference between 2K and 2.56K)
 * @param {Object} options.collection - a style collection to use instead of the global one
 * @param {String} options.style - a specific style to use
 * @returns {String} - the formatted number
 */
const format = (number, options = {}) => {
  const formatted = number / getDivider(options.measurement ? options.measurement : number)
  const fixed = toFixed(formatted, options.precision || 0)
  const collection = options.collection instanceof StyleCollection ? options.collection : styles
  const symbol = (options.measurement ? collection.getSymbol(options.measurement) : collection.getSymbol(getNumberGroup(number), options.style))
  return fixed + symbol
}

class NumberSuffix {
  /**
   * @constructor
   */
  constructor (options = {}) {
    this.stylesCollection = new StyleCollection()
    this.setOptions(options)
  }

  /**
   * Formats a number by the definitions
   * @param {Number} number - a number
   * @param {Object} options - extra options if needed
   * @returns {String}
   */
  format (number, options = {}) {
    const settings = Object.assign({}, {
      style: this.stylesCollection.getDefault(),
      precision: this.precision,
      measurement: this.measurement,
      collection: this.stylesCollection
    }, options)
    return format(number, settings)
  }

  /**
   * Adds a style to the collection by an array
   * @param {Array<String>} style - an array with four or more strings
   * @example
   * addStyle('metric', ['k', 'M', 'G', 'T'])
   * addStyle('abbreviation', ['K', 'M', 'B', 'T'])
   */
  addStyle (...args) {
    this.stylesCollection.add(...args)
    return this
  }

  setDefaultStyle (name) {
    this.stylesCollection.setDefault(name)
    return this
  }

  setOptions (options = {}) {
    this.precision = options.precision || this.precision || 0
    this.measurement = options.measurement || this.measurement || null
    options.style && this.stylesCollection.setDefault(options.style)
  }
}

NumberSuffix.addStyle = addStyle
NumberSuffix.getStyle = getStyle
NumberSuffix.getDivider = getDivider
NumberSuffix.format = format
NumberSuffix.styles = styles
NumberSuffix.toFixed = toFixed
NumberSuffix.format = format

module.exports = NumberSuffix
