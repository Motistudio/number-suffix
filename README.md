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
