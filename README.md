<!-- SHADOW_SECTION_LOGO_START -->

<div><img alt="Logo" src="https://raw.githubusercontent.com/wessberg/intl-relative-time-format/master/documentation/asset/logo.png" height="50"   /></div>

<!-- SHADOW_SECTION_LOGO_END -->

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_START -->

> A fully spec-compliant polyfill for 'Intl.RelativeTimeFormat'

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_END -->

<!-- SHADOW_SECTION_BADGES_START -->

<a href="https://npmcharts.com/compare/intl-relative-time-format?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/intl-relative-time-format.svg"    /></a>
<a href="https://www.npmjs.com/package/intl-relative-time-format"><img alt="NPM version" src="https://badge.fury.io/js/intl-relative-time-format.svg"    /></a>
<a href="https://david-dm.org/wessberg/intl-relative-time-format"><img alt="Dependencies" src="https://img.shields.io/david/wessberg%2Fintl-relative-time-format.svg"    /></a>
<a href="https://github.com/wessberg/intl-relative-time-format/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/wessberg%2Fintl-relative-time-format.svg"    /></a>
<a href="https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"    /></a>
<a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"    /></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://img.shields.io/badge/patreon-donate-green.svg"    /></a>

<!-- SHADOW_SECTION_BADGES_END -->

<!-- SHADOW_SECTION_DESCRIPTION_LONG_START -->

## Description

<!-- SHADOW_SECTION_DESCRIPTION_LONG_END -->

This is a 1:1 implementation of the [`Intl.RelativeTimeFormat`](https://github.com/tc39/proposal-intl-relative-time) draft spec proposal ECMA-402, or the ECMAScript® Internationalization API Specification.
`Intl.RelativeTimeFormat` is a really useful low-level primitive to build on top of which avoids the need to parse lots of CLDR raw data at the expense of your users and their internet connections.

It builds upon other members of the `Intl` family such as `Intl.PluralRules`, `Intl.NumberFormat`, and `Intl.getCanonicalLocales`, so these must be polyfilled. [See this section for an overview](#dependencies--browser-support).

This implementation passes all 150 [Test262 Conformance tests](https://github.com/tc39/test262) from the Official ECMAScript Conformance Test Suite.

<!-- SHADOW_SECTION_FEATURES_START -->

### Features

<!-- SHADOW_SECTION_FEATURES_END -->

Some highlights of this polyfill include:

- A very precise implementation of the spec, with cross-references inlined in the source code
- Conditional loading of Locale data for all CLDR locales
- Well-tested and well-documented.
- Passes all Official ECMAScript Conformance Tests

<!-- SHADOW_SECTION_FEATURE_IMAGE_START -->

<!-- SHADOW_SECTION_FEATURE_IMAGE_END -->

<!-- SHADOW_SECTION_TOC_START -->

## Table of Contents

- [Description](#description)
  - [Features](#features)
- [Table of Contents](#table-of-contents)
- [Install](#install)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Applying the polyfill](#applying-the-polyfill)
- [Loading locale data](#loading-locale-data)
- [Usage](#usage)
  - [Intl.RelativeTimeFormat.prototype.format](#intlrelativetimeformatprototypeformat)
  - [Intl.RelativeTimeFormat.prototype.formatToParts](#intlrelativetimeformatprototypeformattoparts)
  - [Intl.RelativeTimeFormat.prototype.resolvedOptions](#intlrelativetimeformatprototyperesolvedoptions)
  - [Intl.RelativeTimeFormat.supportedLocalesOf](#intlrelativetimeformatsupportedlocalesof)
- [Dependencies & Browser support](#dependencies--browser-support)
- [Contributing](#contributing)
- [Maintainers](#maintainers)
- [Backers](#backers)
  - [Patreon](#patreon)
- [FAQ](#faq)
  - [What is the default locale?](#what-is-the-default-locale)
  - [Are there any known quirks?](#are-there-any-known-quirks)
- [License](#license)

<!-- SHADOW_SECTION_TOC_END -->

<!-- SHADOW_SECTION_INSTALL_START -->

## Install

### NPM

```
$ npm install intl-relative-time-format
```

### Yarn

```
$ yarn add intl-relative-time-format
```

<!-- SHADOW_SECTION_INSTALL_END -->

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

Remember, if you're also depending on a polyfilled version of `Intl.NumberFormat`, `Intl.getCanonicalLocales`, and/or `Intl.PluralRules`, you will need to import those polyfills beforehand.

<!-- SHADOW_SECTION_USAGE_START -->

## Usage

<!-- SHADOW_SECTION_USAGE_END -->

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
const rtf = new Intl.RelativeTimeFormat("en", {
	numeric: "always",
	style: "narrow"
});

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
- `Intl.getCanonicalLocales`

For by far the most browsers, these features will already be natively available.
Generally, I would highly recommend using something like [Polyfill.app](https://github.com/wessberg/Polyfiller) which takes care of this stuff automatically.

<!-- SHADOW_SECTION_CONTRIBUTING_START -->

## Contributing

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).

<!-- SHADOW_SECTION_CONTRIBUTING_END -->

<!-- SHADOW_SECTION_MAINTAINERS_START -->

## Maintainers

| <img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="70"   />                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frederik Wessberg](mailto:frederikwessberg@hotmail.com)<br><strong>Twitter</strong>: [@FredWessberg](https://twitter.com/FredWessberg)<br>_Lead Developer_ |

<!-- SHADOW_SECTION_MAINTAINERS_END -->

<!-- SHADOW_SECTION_BACKERS_START -->

## Backers

### Patreon

[Become a backer](https://www.patreon.com/bePatron?u=11315442) and get your name, avatar, and Twitter handle listed here.

<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Backers on Patreon" src="https://patreon-badge.herokuapp.com/11315442.png"  width="500"  /></a>

<!-- SHADOW_SECTION_BACKERS_END -->

<!-- SHADOW_SECTION_FAQ_START -->

## FAQ

<!-- SHADOW_SECTION_FAQ_END -->

### What is the default locale?

The default locale will be equal to the locale file you load first.

### Are there any known quirks?

Nope!

<!-- SHADOW_SECTION_LICENSE_START -->

## License

MIT © [Frederik Wessberg](mailto:frederikwessberg@hotmail.com) ([@FredWessberg](https://twitter.com/FredWessberg)) ([Website](https://github.com/wessberg))

<!-- SHADOW_SECTION_LICENSE_END -->
