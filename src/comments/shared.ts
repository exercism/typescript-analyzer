import { factory } from "./comment"

/**
 * The factories here SHOULD be kept in sync with exercism/website-copy. Under
 * normal use, they do NOT dictate the actual commentary output of the analyzer,
 * as that is provided by the website-copy repo.
 *
 * https://github.com/exercism/website-copy/tree/master/automated-comments/typescript/general
 */

export const UNEXPECTED_REQUIRED_PARAMETER = factory<'parameter.name' | 'parameter.type'>`
The parameter \`${'parameter.name'}\` is called with and without a value in
the tests, but you have not marked it as optional, which means that the tests
won't pass. You can fix this by marking it explicitly as optional:

\`\`\`typescript
  function(${'parameter.name'}?: ${'parameter.type'}") {
    //
  }
\`\`\`

Or by assigning a default value:

\`\`\`typescript
  function(${'parameter.name'}: ${'parameter.type'} = <default>) {
    //
  }
\`\`\`

`('typescript.general.unexpected_required_parameter')

export const UNEXPECTED_BOXED_TYPE = factory<'boxed.type' | 'literal.type'>`
You're using a boxed type \`${'boxed.type'}\`. In TypeScript, the types
\`Object\`, \`Number\`, \`Boolean\` and \`String\` are types which refer to
non-primitive boxed objects that are almost never used appropriately in
TypeScript or JavaScript code.

Use \`${'literal.type'}\' instead.
`('typescript.general.unexpected_boxed_type')

export const PREFER_EXPLICIT_RETURN_TYPE_FOR_PUBLIC_API = factory<'signature'>`
TypeScript is really good at type inference and will assign a return type to
your functions. In order to guard against accidental changes, always define
the return type for public API, such as functions you export:

\`\`\`typescript
  ${'signature'}: <return-type> {}
\`\`\`

Now, if you accidentally change your function to return a different type,
compilation fails and you have successfully guarded against a source of bugs.
`('typescript.general.prefer_explicit_return_type')

export const PREFER_UNPREFIXED_UNDERSCORE_PARAMETERS = factory<'parameter.name'>`
Unlike other languages, \`_parameter\` does not signify a *private* variable.
TypeScript has its own constructs for marking variables private (such as the
  \`private\` keyword for class members).

Instead, in TypeScript, prefixing a parameter with an underscore will stop
most IDEs from highlighting that parameter if it's unused, which is actually a
tool you probably want to keep in this case. Remove the underscore \`_\` from
${'parameter.name'} in order to fix this.
`('typescript.general.prefer_unprefixed_underscore_parameters')

export const NO_METHOD = factory<'method.name'>`
No method called \`${'method.name'}\`. The tests won't pass without it.
`('typescript.general.no_method')

export const NO_NAMED_EXPORT = factory<'export.name'>`
No [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) called \`${'export.name'}\`.
The tests won't pass without it.

Did you forget adding: \`export ${'export.name'}\`?
`('typescript.general.no_named_export')

export const NO_DEFAULT_EXPORT = factory`
No [default](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/default)
[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).
The tests won't pass without it.

Did you forget adding: \`export default ...\`?
`('typescript.general.no_default_export')

export const NO_PARAMETER = factory<'function.name'>`
Your function \`${'function.name'}\` does not have a parameter.
The tests won't pass without it.
`('typescript.general.no_parameter')

export const UNEXPECTED_PARAMETER = factory<'type'>`
Did not find a parameter of type \`${'type'}\`.
`('javascript.general.unexpected_parameter')

export const UNEXPECTED_SPLAT_ARGS = factory<'splat-arg.name' | 'parameter.type'>`
Instead of using \`...${'splat-arg.name'}: ${'parameter.type'}[]\`, you should
define a parameter called \`${'splat-arg.name'}\` with the type \`${'parameter.type'}\`.

[Rest parameters / splat arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
are great if you don't know how many values you will receive and it can be an
arbitrary number, but in this case you know how many values you want.
`('typescript.general.unexpected_splat_args')

export const PREFER_TEMPLATED_STRINGS = factory`
You're manually building a string using string concatenation. You can use a
[templated string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
instead and interpolate dynamic values:

\`\`\`typescript
"Hello there \${firstName}, I will give you \${calculateInventory()} apples."
\`\`\`

`('typescrypt.general.prefer_templated_strings')

export const PREFER_STRICT_EQUALITY = factory`
In _JavaScript_, always prefer [strict (identity and non-identity) equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity)
such as \`===\` and \`!==\` over the forms that use implicit type coercion,
such as [\`==\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality)
and [\`!=\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality),
unless you explicitly want to coerce the type of one of the two operands.

The same is true for typescript, even though _TypeScript_ tracks the
types, as there are many cases where TypeScript won't be able to guard against
this implicit type coercion.
`('typescrypt.general.prefer_strict_equality')

export const PARSE_ERROR = factory<'error' | 'details'>`
There is something wrong with your submission, most likely a Syntax Error:

Message: "${'error'}"

\`\`\`
${'details'}
\`\`\`
`('typescrypt.generic.parse_error')

export const PREFER_CONST_OVER_LET_AND_VAR = factory<'kind' | 'name'>`
Instead of \`${'kind'} ${'name'}\`, consider using \`const\`.

\`const\` is a signal that the identifier won't be reassigned, which SHOULD be
true for this top-level constant. (Not to be confused with _immutable values_).
`('typescrypt.generic.prefer_const_over_let_and_var')
