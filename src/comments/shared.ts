import { factory } from "./comment"

export const UNEXPECTED_REQUIRED_PARAMETER = factory<'parameter_name' | 'parameter_type'>`
The parameter \`${'parameter_name'}\` is called with and without a value in
the tests, but you have not marked it as optional, which means that the tests
won't pass. You can fix this by marking it explicitly as optional:

\`\`\`typescript
  function(${'parameter_name'}?: ${'parameter_type'}") {
    //
  }
\`\`\`

Or by assigning a default value:

\`\`\`typescript
  function(${'parameter_name'}: ${'parameter_type'} = <default>) {
    //
  }
\`\`\`

`('typescript.generic.unexpected_required_parameter')

export const UNEXPECTED_BOXED_TYPE = factory<'boxed_type' | 'literal_type'>`
You're using a boxed type \`${'boxed_type'}\`. In TypeScript, the types
\`Object\`, \`Number\`, \`Boolean\` and \`String\` are types which refer to
non-primitive boxed objects that are almost never used appropriately in
TypeScript or JavaScript code.

Use \`${'literal_type'}\' instead.
`('typescript.generic.unexpected_boxed_type')

export const PREFER_EXPLICIT_RETURN_TYPE_FOR_PUBLIC_API = factory<'signature'>`
TypeScript is really good at type inference and will assign a return type to
your functions. In order to guard against accidental changes, always define
the return type for public API, such as functions you export:

\`\`\`typescript
  ${'signature'}: <return-type> {}
\`\`\`

Now, if you accidentally change your function to return a different type,
compilation fails and you have successfully guarded against a source of bugs.
`('typescript.generic.prefer_explicit_return_type')

export const PREFER_UNPREFIXED_UNDERSCORE_PARAMETERS = factory<'parameter_name'>`
Unlike other languages, \`_parameter\` does not signify a *private* variable.
TypeScript has its own constructs for marking variables private (such as the
  \`private\` keyword for class members).

Instead, in TypeScript, prefixing a parameter with an underscore will stop
most IDEs from highlighting that parameter if it's unused, which is actually a
tool you probably want to keep in this case. Remove the underscore \`_\` from
${'parameter_name'} in order to fix this.
`('typescript.generic.prefer_unprefixed_underscore_parameters')

export const NO_METHOD = factory<'method_name'>`
No method called \`${'method_name'}\`. The tests won't pass without it.
`('typescript.generic.no_method')

export const NO_NAMED_EXPORT = factory<'export_name'>`
No [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) called \`${'export_name'}\`.
The tests won't pass without it.

Did you forget adding: \`export ${'export_name'}\`?
`('typescript.generic.no_named_export')

export const NO_DEFAULT_EXPORT = factory`
No [default](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/default)
[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).
The tests won't pass without it.

Did you forget adding: \`export default ...\`?
`('typescript.generic.no_default_export')

export const NO_PARAMETER = factory<'function_name'>`
Your function \`${'function_name'}\` does not have a parameter.
The tests won't pass without it.
`('typescript.generic.no_parameter')

export const UNEXPECTED_PARAMETER = factory<'type'>`
Did not find a parameter of type \`${'type'}\`.
`('javascript.generic.unexpected_parameter')

export const UNEXPECTED_SPLAT_ARGS = factory<'splat_arg_name' | 'parameter_type'>`
Instead of using \`...${'splat_arg_name'}: ${'parameter_type'}[]\`, you should
define a parameter called \`${'splat_arg_name'}\` with the type \`${'parameter_type'}\`.

[Rest parameters / splat arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
are great if you don't know how many values you will receive and it can be an
arbitrary number, but in this case you know how many values you want.
`('typescript.generic.unexpected_splat_args')

export const PREFER_TEMPLATED_STRINGS = factory`
You're manually building a string using string concatenation. You can use a
[templated string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
instead and interpolate dynamic values:

\`\`\`typescript
"Hello there \${firstName}, I will give you \${calculateInventory()} apples."
\`\`\`

`('typescrypt.generic.prefer_templated_strings')

export const PREFER_STRICT_EQUALITY = factory`
In _JavaScript_, always prefer [strict (identity and non-identity) equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity)
such as \`===\` and \`!==\` over the forms that use implicit type coercion,
such as [\`==\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality)
and [\`!=\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality),
unless you explicitly want to coerce the type of one of the two operands.

The same is true for typescript, even though _TypeScript_ tracks the
types, as there are many cases where TypeScript won't be able to guard against
this implicit type coercion.
`('typescrypt.generic.prefer_strict_equality')
