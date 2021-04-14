import { CommentType, factory } from './comment'

/**
 * The factories here SHOULD be kept in sync with exercism/website-copy. Under
 * normal use, they do NOT dictate the actual commentary output of the analyzer,
 * as that is provided by the website-copy repo.
 *
 * https://github.com/exercism/website-copy/tree/master/automated-comments/typescript/general
 */

export const UNEXPECTED_REQUIRED_PARAMETER = factory<
  'parameter.name' | 'parameter.type'
>`
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

`('typescript.general.unexpected_required_parameter', CommentType.Essential)

export const UNEXPECTED_BOXED_TYPE = factory<'boxed.type' | 'literal.type'>`
You're using a boxed type \`${'boxed.type'}\`. In TypeScript, the types
\`Object\`, \`Number\`, \`Boolean\` and \`String\` are types which refer to
non-primitive boxed objects that are almost never used appropriately in
TypeScript or JavaScript code.

Use \`${'literal.type'}\' instead.
`('typescript.general.unexpected_boxed_type', CommentType.Essential)

export const PREFER_EXPLICIT_RETURN_TYPE_FOR_PUBLIC_API = factory<'signature'>`
TypeScript is really good at type inference and will assign a return type to
your functions. In order to guard against accidental changes, always define
the return type for public API, such as functions you export:

\`\`\`typescript
  ${'signature'}: <return-type> {}
\`\`\`

Now, if you accidentally change your function to return a different type,
compilation fails and you have successfully guarded against a source of bugs.
`('typescript.general.prefer_explicit_return_type', CommentType.Actionable)

export const PREFER_UNPREFIXED_UNDERSCORE_PARAMETERS = factory<'parameter.name'>`
Unlike other languages, \`_parameter\` does not signify a *private* variable.
TypeScript has its own constructs for marking variables private (such as the
  \`private\` keyword for class members).

Instead, in TypeScript, prefixing a parameter with an underscore will stop
most IDEs from highlighting that parameter if it's unused, which is actually a
tool you probably want to keep in this case. Remove the underscore \`_\` from
${'parameter.name'} in order to fix this.
`(
  'typescript.general.prefer_unprefixed_underscore_parameters',
  CommentType.Actionable
)

export const NO_METHOD = factory<'method.name'>`
No method called \`${'method.name'}\`. The tests won't pass without it.
`('typescript.general.no_method', CommentType.Essential)
export const NO_NAMED_EXPORT = factory<'export.name'>`
No [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) called \`${'export.name'}\`.
The tests won't pass without it.

Did you forget adding: \`export ${'export.name'}\`?
`('typescript.general.no_named_export', CommentType.Essential)

export const NO_DEFAULT_EXPORT = factory`
No [default](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/default)
[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).
The tests won't pass without it.

Did you forget adding: \`export default ...\`?
`('typescript.general.no_default_export', CommentType.Essential)

export const NO_PARAMETER = factory<'function.name'>`
Your function \`${'function.name'}\` does not have a parameter.
The tests won't pass without it.
`('typescript.general.no_parameter', CommentType.Essential)

export const UNEXPECTED_PARAMETER = factory<'type'>`
Did not find a parameter of type \`${'type'}\`.
`('typescript.general.unexpected_parameter', CommentType.Actionable)

export const UNEXPECTED_SPLAT_ARGS = factory<
  'splat-arg.name' | 'parameter.type'
>`
Instead of using \`...${'splat-arg.name'}: ${'parameter.type'}[]\`, you should
define a parameter called \`${'splat-arg.name'}\` with the type \`${'parameter.type'}\`.

[Rest parameters / splat arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
are great if you don't know how many values you will receive and it can be an
arbitrary number, but in this case you know how many values you want.
`('typescript.general.unexpected_splat_args', CommentType.Actionable)

export const PREFER_TEMPLATED_STRINGS = factory`
You're manually building a string using string concatenation. You can use a
[templated string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
instead and interpolate dynamic values:

\`\`\`typescript
"Hello there \${firstName}, I will give you \${calculateInventory()} apples."
\`\`\`

`('typescript.general.prefer_templated_strings', CommentType.Actionable)

export const PREFER_STRICT_EQUALITY = factory`
In _JavaScript_, always prefer [strict (identity and non-identity) equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity)
such as \`===\` and \`!==\` over the forms that use implicit type coercion,
such as [\`==\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality)
and [\`!=\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality),
unless you explicitly want to coerce the type of one of the two operands.

The same is true for typescript, even though _TypeScript_ tracks the
types, as there are many cases where TypeScript won't be able to guard against
this implicit type coercion.
`('typescript.general.prefer_strict_equality', CommentType.Actionable)

export const PARSE_ERROR = factory<'error' | 'details'>`
There is something wrong with your submission, most likely a Syntax Error:

Message: "${'error'}"

\`\`\`
${'details'}
\`\`\`
`('typescript.generic.parse_error', CommentType.Essential)

export const PREFER_CONST_OVER_LET_AND_VAR = factory<'kind' | 'name'>`
Instead of \`${'kind'} ${'name'}\`, consider using \`const\`.

\`const\` is a signal that the identifier won't be reassigned, which SHOULD be
true for this top-level constant. (Not to be confused with _immutable values_).
`('typescript.generic.prefer_const_over_let_and_var', CommentType.Informative)

export const ERROR_CAPTURED_NO_SOURCE = factory<'expected' | 'available'>`
Expected source file "${'expected'}", found: ${'available'}.
`('typescript.general.error_captured_no_source', CommentType.Essential)

export const EXEMPLAR_SOLUTION = factory`
🎉 That is an exemplar solution. Congratulations. It is exactly what we think
is the most idiomatic implementation of the tasks at hand. Rejoice!
`('typescript.general.exemplar', CommentType.Celebratory)

export const FUNCTION_NOT_OPTIMAL = factory<'function'>`
📕 It looks like ${'function'} is not optimal. This analyzer is a Work In
Progress and can't tell you exactly why it thinks something is not optimal. Feel
free to ignore this feedback. If you wish to attempt to resolve it, the advice
is as follows: this function is expected to be as simple as possible, without
declaring any extra variables.`(
  'typescript.general.function_not_optimal',
  CommentType.Informative
)

export const SIGNATURE_CHANGED = factory`
📕 Don't change the function declarations unless absolutely necessary. The stub
provides the correct exports and correct function declarations, with the
expected amount and format of parameters. It is sometimes possible to change the
function signature (change how its parameters work), but in this case the
parameters were already optimally defined.
`('typescript.general.signature_changed', CommentType.Informative)

export const REPLACE_MAGIC_WITH_IDENTIFIER = factory<'literal' | 'identifier'>`
The a magic value \`${'literal'}\` can be replaced by \`${'identifier'}\`. When
possible, named constants are often a better choice than in-lined literals.
`('typescript.general.replace_magic_with_identifier', CommentType.Actionable)
