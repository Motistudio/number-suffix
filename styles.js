'use strict'

const {units, styles} = require('./constants')

/**
 * @class Style
 * @description A class to represent a style as an object
 */
class Style {
  constructor (symbols) {
    /**
     * Filling up units.
     * the object looks like this (sort of):
     * this.thousand = 'k'
     * this.million = 'M'
     */
    units.forEach((unit, index) => {
      this[unit] = symbols[index] || styles.metric[index]
    })
  }

  /**
   * Returns a symbol by a group
   * @param {String} group - a group ('thousand', 'million', etc)
   * @returns {String}
   */
  getSymbol (group) {
    return this[group]
  }
}

/**
 *
 */
class StyleCollection {
  constructor () {
    this.styles = {}
    this.default = null

    // default setup
    this.add('metric', styles.metric)
    this.add('abbreviation', styles.abbreviation)
    this.setDefault('metric')
  }

  /**
   * adds a style to the collection by an array
   * @param {Array<String>} style - an array with four or more strings
   * @example
   * add('metric', ['k', 'M', 'G', 'T'])
   * add('abbreviation', ['K', 'M', 'B', 'T'])
   */
  add (name, symbols = []) {
    this.styles[name] = new Style(symbols)
    return this
  }

  /**
   * Returns a style by name
   * @param {String} name - the style name
   * @returns {Object} - the style
   */
  get (name) {
    return this.styles[name]
  }

  /**
   * Returns the symbol of a number by a style
   * @param {String} group - the number group - thousand, million, billion etc.
   * @param {String} style - a style name for formatting
   * @returns {String}
   */
  getSymbol (group, style = this.default) {
    return this.get(style).getSymbol(group)
  }

  /**
   * Sets the default style name
   * @param {String} name - the style's name
   * @returns {Object} - return the collection object (chainable)
   */
  setDefault (name) {
    this.default = name
    return this
  }

  /**
   * Returns the default style name
   */
  getDefault () {
    return this.default
  }
}

StyleCollection.Style = Style

module.exports = StyleCollection
