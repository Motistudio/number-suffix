'use strict'

const test = require('tape')

const NumberSuffix = require('../')

test('Should be a function', t => {
  t.plan(1)
  t.equal(typeof NumberSuffix, 'function', 'NumberSuffix is a function')
  t.end()
})

test('Should have its API', t => {
  t.plan(2)
  t.equal(typeof NumberSuffix.styles, 'object', 'NumberSuffix.styles is an object')
  t.equal(typeof NumberSuffix.addStyle, 'function', 'NumberSuffix.addStyle is a function')
  t.end()
})

test('Should tell the correct devider by string', t => {
  t.plan(8)
  t.equal(NumberSuffix.getDivider('thousand'), 1000, '1,000 for thousand')
  t.equal(NumberSuffix.getDivider('THOUSAND'), 1000, '1,000 for thousand')
  t.equal(NumberSuffix.getDivider('million'), 1000000, '1,000,000 for million')
  t.equal(NumberSuffix.getDivider('MILLION'), 1000000, '1,000,000 for million')
  t.equal(NumberSuffix.getDivider('billion'), 1000000000, '1,000,000,000 for billion')
  t.equal(NumberSuffix.getDivider('BILLION'), 1000000000, '1,000,000,000 for billion')
  t.equal(NumberSuffix.getDivider('trillion'), 1000000000000, '1,000,000,000,000 for trillion')
  t.equal(NumberSuffix.getDivider('TRILLION'), 1000000000000, '1,000,000,000,000 for trillion')
  t.end()
})

test('Should tell the correct devider by a number', t => {
  t.plan(15)
  t.equal(NumberSuffix.getDivider(0), 1000, '1,000 (k) for zero')
  t.equal(NumberSuffix.getDivider(1), 1000, '1,000 (k) for single digit')
  t.equal(NumberSuffix.getDivider(10), 1000, '1,000 (k) for two digits')
  t.equal(NumberSuffix.getDivider(100), 1000, '1,000 (k) for three digits')
  t.equal(NumberSuffix.getDivider(1000), 1000, '1,000 (k) for four digits')
  t.equal(NumberSuffix.getDivider(10000), 1000, '1,000 (k) for five digits')
  t.equal(NumberSuffix.getDivider(100000), 1000, '1,000 (k) for six digits')
  t.equal(NumberSuffix.getDivider(1000000), 1000000, '1,000,000 (M) for seven digits (six zeros)')
  t.equal(NumberSuffix.getDivider(10000000), 1000000, '1,000,000 (M) for eight digits (seven zeros)')
  t.equal(NumberSuffix.getDivider(100000000), 1000000, '1,000,000 (M) for nine digits (eight zeros)')
  t.equal(NumberSuffix.getDivider(1000000000), 1000000000, '1,000,000,000 (G) for ten digits (nine zeros)')
  t.equal(NumberSuffix.getDivider(10000000000), 1000000000, '1,000,000,000 (G) for eleven digits (ten zeros)')
  t.equal(NumberSuffix.getDivider(100000000000), 1000000000, '1,000,000,000 (G) for twelve digits (eleven zeros)')
  t.equal(NumberSuffix.getDivider(1000000000000), 1000000000000, '1,000,000,000,000 (T) for thirteen digits (twelve zeros)')
  t.equal(NumberSuffix.getDivider(1e16), 1000000000000, '1,000,000,000,000 (T) for seventeen digits (sixteen zeros)')
  t.end()
})

test('Should get a fixed number string', t => {
  t.plan(4)
  const number = 12.34
  t.equal(NumberSuffix.toFixed(number), '12', '12 for 12.34')
  t.equal(NumberSuffix.toFixed(number, 1), '12.3', '12.3 for 12.34 with one decimal point precision')
  t.equal(NumberSuffix.toFixed(number, 2), '12.34', '12.34 for 12.34 with two decimal point precision')
  t.equal(NumberSuffix.toFixed(number, 3), '12.340', '12.340 for 12.34 with three decimal point precision')
  t.end()
})

test('Should add a new style', t => {
  t.plan(4)
  const style = ['a', 'b', 'c', 'd']
  NumberSuffix.addStyle('abc', style)
  const savedStyle = NumberSuffix.getStyle('abc')
  t.equal(savedStyle['thousand'], style[0], 'style\'s thousands is correct')
  t.equal(savedStyle['million'], style[1], 'style\'s millions is correct')
  t.equal(savedStyle['billion'], style[2], 'style\'s billions is correct')
  t.equal(savedStyle['trillion'], style[3], 'style\'s trillions is correct')
  t.end()
})

test('Should format a number', t => {
  t.plan(10)
  t.equal(NumberSuffix.format(1234), '1k', '1k for 1,234')
  t.equal(NumberSuffix.format(12345), '12k', '12k for 12,345')
  t.equal(NumberSuffix.format(123456), '123k', '123k for 123,456')
  t.equal(NumberSuffix.format(1234567), '1M', '1M for 1,234,567')
  t.equal(NumberSuffix.format(12345678), '12M', '12M for 12,345,678')
  t.equal(NumberSuffix.format(123456789), '123M', '123M for 123,456,789')
  t.equal(NumberSuffix.format(1234567891), '1G', '1G for 1,234,567,891')
  t.equal(NumberSuffix.format(12345678910), '12G', '12G for 12,345,678,910')
  t.equal(NumberSuffix.format(123456789101), '123G', '123G for 123,456,789,101')
  t.equal(NumberSuffix.format(1234567891011), '1T', '1T for 1,234,567,891,011')
  t.end()
})

test('Should format a number with precision', t => {
  t.plan(6)
  const number = 1234
  t.equal(NumberSuffix.format(number, {}), '1k', '1k for 1,234 with no precision')
  t.equal(NumberSuffix.format(number, {precision: 0}), '1k', '1k for 1,234 with precision of 0')
  t.equal(NumberSuffix.format(number, {precision: 1}), '1.2k', '1.2k for 1,234 with precision of 1')
  t.equal(NumberSuffix.format(number, {precision: 2}), '1.23k', '1.23k for 1,234 with precision of 2')
  t.equal(NumberSuffix.format(number, {precision: 3}), '1.234k', '1.234k for 1,234 with precision of 3')
  t.equal(NumberSuffix.format(number, {precision: 4}), '1.2340k', '1.2340k for 1,234 with precision of 4')
  t.end()
})

test('Should format a fixed measurement', t => {
  t.plan(4)
  t.equal(NumberSuffix.format(1234, {measurement: 'thousand'}), '1k', '1k for 1,234 as a thousand')
  t.equal(NumberSuffix.format(1234567, {measurement: 'thousand'}), '1234k', '1234k for 1,234,567 as a thousand')
  t.equal(NumberSuffix.format(1234, {measurement: 'million'}), '0M', '0M for 1,234 as a million')
  t.equal(NumberSuffix.format(1234, {measurement: 'million', precision: 3}), '0.001M', '0.001M for 1,234 as a million')
  t.end()
})

test('Should format a different style', t => {
  t.plan(4)
  t.equal(NumberSuffix.format(1e3, {style: 'abbreviation'}), '1K', '1K for 1,000 (abbreviation)')
  t.equal(NumberSuffix.format(1e6, {style: 'abbreviation'}), '1M', '1M for 1,000,000 (abbreviation)')
  t.equal(NumberSuffix.format(1e9, {style: 'abbreviation'}), '1B', '1B for 1,000,000,000 (abbreviation)')
  t.equal(NumberSuffix.format(1e12, {style: 'abbreviation'}), '1T', '1T for 1,000,000,000,000 (abbreviation)')
  t.end()
})

test('Should add a new style and format by it', t => {
  t.plan(4)
  const style = ['K', 'MM', 'B', 'T']
  NumberSuffix.addStyle('newStyle', style)
  t.equal(NumberSuffix.format(1e3, {style: 'newStyle'}), '1K', '1K for 1,000 (newStyle)')
  t.equal(NumberSuffix.format(1e6, {style: 'newStyle'}), '1MM', '1MM for 1,000,000 (newStyle)')
  t.equal(NumberSuffix.format(1e9, {style: 'newStyle'}), '1B', '1B for 1,000,000,000 (newStyle)')
  t.equal(NumberSuffix.format(1e12, {style: 'newStyle'}), '1T', '1T for 1,000,000,000,000 (newStyle)')
  t.end()
})
