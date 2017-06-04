'use strict'

module.exports = {
  styles: {
    metric: ['k', 'M', 'G', 'T', 'P', 'E'],
    abbreviation: ['K', 'M', 'B', 'T', 'q', 'Q']
  },

  /**
   * Deviders by number size
   * @constant
   * @private
   */
  dividers: {
    'thousand': 1e3,
    'million': 1e6,
    'billion': 1e9,
    'trillion': 1e12,
    'quadrillion': 1e15,
    'quintillion': 18e18
  },

  /**
   * Units
   */
  units: ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion']
}
