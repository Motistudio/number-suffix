# NumberFormat
By Moti Shriki

## What?

NumberFormat is a package for ceiling numbers with a suffix for its zeros.
Example:
* 1,234 -> 1k
* 1,234,567 -> 1M

### Featues
* Precision
* Fixed measurement
* Adding more formatting styles, already supports:
  * Metric (default)
  * Abbreviation

### Why not using `number-abbreviate`, `numbr` or `numeraljs`?
Mainly because of the libraries usage. I needed something very generic to work with for a project I'm currenly working on. The other libraries had either a specific usage (which works well on the wide internet) or a missing feature that I was needed.
`number-abbreviate` was the closest thing I found that meets my expectation - but lacked one feature I needed: a fixed measurement for numbers.

Also, this library uses mainly mathematic function for calculations compared to other libraries that uses strings instead, leading to slower performance.

### Installation

Just npm-install it:
```
npm i number-suffix --save
```

### Usage

Basic usage:
```javascript
NumberSuffix.format(1234) // 1k
NumberSuffix.format(1234567) // 1M
NumberSuffix.format(1e9) // 1G
NumberSuffix.format(1e12) // 1T
```

Precision:
```javascript
NumberSuffix.format(1234, {precision: 2}) // 1.23k
NumberSuffix.format(1234567, {precision: 2}) // 1.23M
```

Fixed measurement:
Supports: 'thousand', 'million', 'billion', 'trillion'.
```javascript
NumberSuffix.format(1234567, {measurement: 'thousand'}) // 1234k
NumberSuffix.format(1234, {precision: 3, measurement: 'million'}) // 0.001M
```

Abbreviation:
```javascript
NumberSuffix.format(1e3, {style: 'abbreviation'}) // 1K
NumberSuffix.format(1e9, {style: 'abbreviation'}) // 1B
```

And adding and using a new style:
```javascript
NumberSuffix.addStyle('yourStyleName', ['Thousand', 'Million', 'Billion', 'Trillion'])
NumberSuffix.format(1e6, {style: 'yourStyleName'}) // 1Million
```
If there are null values it will lean on the metric style as a fallback.

## Instance
You can create an instance of NumberSuffix for more specific usage without using global settings.
```javascript
const numberSuffix = new NumberSuffix({...})
```

You can use fixed options in addition to the ones you have:
```javascript
const numberSuffix = new NumberSuffix({style: 'abbreviation'})
numberSuffix.format(1e3) // 1K
```
```javascript
const numberSuffix = new NumberSuffix({precision: 2})
numberSuffix.format(1234) // 1.23k
```
```javascript
const numberSuffix = new NumberSuffix({measurement: 'thousand'})
numberSuffix.format(1234567) // 1234k
```

And, of course, to override them for even more specific usage:
```javascript
const numberSuffix = new NumberSuffix({measurement: 'thousand'})
numberSuffix.format(1234567, {measurement: 'million'}) // 1M
```

You can add your own style as well with
```javascript
const numberSuffix = new NumberSuffix()
numberSuffix.addStyle('myStyle', ['T', 'M', 'B', 'T'])
numberSuffix.setDefaultStyle('myStyle')
```

To change the fixed options you can just:
```javascript
const numberSuffix = new NumberSuffix()
numberSuffix.setOptions({...})
```
