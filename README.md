<a href="https://npmcharts.com/compare/intl-relative-time-format?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/intl-relative-time-format.svg" height="20"></img></a>
<a href="https://david-dm.org/intl-relative-time-format"><img alt="Dependencies" src="https://img.shields.io/david/intl-relative-time-format.svg" height="20"></img></a>
<a href="https://www.npmjs.com/package/intl-relative-time-format"><img alt="NPM Version" src="https://badge.fury.io/js/intl-relative-time-format.svg" height="20"></img></a>
<a href="https://github.com/wessberg/intl-relative-time-format/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/wessberg%2Fintl-relative-time-format.svg" height="20"></img></a>
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" height="20"></img></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height="20"></img></a>

# `intl-relative-time-format`

> A fully spec-compliant polyfill for 'Intl.RelativeTimeFormat'

## Description

This is a 1:1 implementation of the [`Intl.RelativeTimeFormat`](https://github.com/tc39/proposal-intl-relative-time) draft spec proposal ECMA-402, or the ECMAScript® Internationalization API Specification.
`Intl.RelativeTimeFormat` is a really useful low-level primitive to build on top of which avoids the need to parse lots of CLDR raw data at the expense of your users and their internet connections.

Some highlights of this polyfill include:

- A very precise implementation of the spec, with cross-references inlined in the source code
- Conditional loading of Locale data for all CLDR locales
- Well-tested and well-documented.

It builds upon other members of the `Intl` family such as `Intl.PluralRules` and `Intl.NumberFormat`, so these must be polyfilled. [See this section for an overview](#dependencies--browser-support).

## Install

### NPM

```
$ npm install intl-relative-time-format
```

### Yarn

```
$ yarn add intl-relative-time-format
```

## Applying the polyfill

The polyfill will check for the existence of `Intl.RelativeTimeFormat` and will _only_ be applied if the runtime doesn't already support it.

To include it, add this somewhere:

```typescript
import "intl-relative-time-format";

// Or with commonjs:
require("intl-relative-time-format");
```

However, it is strongly suggested that you only include the polyfill for runtimes that don't already support `Intl.RelativeTimeFormat`.
One way to do so is with an async import:

```typescript
if (!("RelativeTimeFormat" in Intl)) {
  await import("intl-relative-time-format");

  // or with commonjs:
  require("intl-relative-time-format");
}
```

Alternatively, you can use [Polyfill.app](https://github.com/wessberg/Polyfiller) which uses this polyfill and takes care of only loading the polyfill if needed as well as adding the language features that the polyfill depends on (See [dependencies](#dependencies--browser-support)).

## Loading locale data

By default, no CLDR locale data is loaded. Instead, _you_ decide what data you want.
To load data, you can import it via the `/locale-data` subfolder that comes with the NPM package:

With ES modules:

```typescript
// Load the polyfill
import "intl-relative-time-format";

// Load data for the 'en' locale
import "intl-relative-time-format/locale-data/en";
```

And naturally, it also works with commonjs:

```typescript
// Load the polyfill
require("intl-relative-time-format");

// Load data for the 'en' locale
require("intl-relative-time-format/locale-data/en");
```

Remember, if you're also depending on a polyfilled version of `Intl.NumberFormat` and/or `Intl.PluralRules`, you will need to import those polyfills beforehand.

## Usage

The following examples are taken [directly from the original proposal](https://github.com/tc39/proposal-intl-relative-time)

### Intl.RelativeTimeFormat.prototype.format

```typescript
// Create a relative time formatter in your locale
// with default values explicitly passed in.
const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit", // other values: "lookup"
  numeric: "always", // other values: "auto"
  style: "long" // other values: "short" or "narrow"
});

// Format relative time using negative value (-1).
rtf.format(-1, "day");
// > "1 day ago"

// Format relative time using positive  value (1).
rtf.format(1, "day");
// > "in 1 day"
```

```typescript
// Create a relative time formatter in your locale
// with numeric: "auto" option value passed in.
const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});

// Format relative time using negative value (-1).
rtf.format(-1, "day");
// > "yesterday"

// Format relative time using positive day unit (1).
rtf.format(1, "day");
// > "tomorrow"
```

### Intl.RelativeTimeFormat.prototype.formatToParts

```typescript
const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});

// Format relative time using the day unit.
rtf.formatToParts(-1, "day");
// > [{ type: "literal", value: "yesterday"}]

rtf.formatToParts(100, "day");
// > [{ type: "literal", value: "in " }, { type: "integer", value: "100", unit: "day" }, { type: "literal", value: " days" }]
```

### Intl.RelativeTimeFormat.prototype.resolvedOptions

```typescript
const rtf = new Intl.RelativeTimeFormat("en", {numeric: "always", style: "narrow"});

rtf.resolvedOptions();
// > [{ locale: "en", numberingSystem: "latn", numeric: "always", style: "narrow"}]
```

### Intl.RelativeTimeFormat.supportedLocalesOf

```typescript
Intl.RelativeTimeFormat.supportedLocalesOf(["foo", "bar", "en-US"]);
// > ["en-US"]
```

## Dependencies & Browser support

This polyfill is distributed in ES3-compatible syntax, but is using some additional APIs and language features which must be available:

- `Array.prototype.includes`
- `Object.create`
- `Object.is`
- `Number.prototype.toLocaleString`
- `String.prototype.includes`
- `String.prototype.replace`
- `Symbol.toStringTag`,
- `WeakMap`
- `Intl.NumberFormat`
- `Intl.PluralRules`

For by far the most browsers, these features will already be natively available.
Generally, I would highly recommend using something like [Polyfill.app](https://github.com/wessberg/Polyfiller) which takes care of this stuff automatically.

## Contributing

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).

## Maintainers

- <a href="https://github.com/wessberg"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="11"></img></a> [Frederik Wessberg](https://github.com/wessberg): _Maintainer_

## FAQ

### What is the default locale?

The default locale will be equal to the locale file you load first.

### Are there any known quirks?

Nope!

## Backers 🏅

[Become a backer](https://www.patreon.com/bePatron?u=11315442) and get your name, logo, and link to your site listed here.

## License 📄

MIT © [Frederik Wessberg](https://github.com/wessberg)
