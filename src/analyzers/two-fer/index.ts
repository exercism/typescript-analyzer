import {
  BinaryExpression,
  ConditionalExpression,
  IfStatement,
  LogicalExpression,
  Program,
  TemplateLiteral
} from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import { BaseAnalyzer } from "../base_analyzer"

import { extractAll } from "../generic/extract_all"
import { extractDefaultExport } from "../generic/extract_export"
import { extractFirst } from "../generic/extract_first"
import { extractMainMethod, MainMethod } from "../generic/extract_main_method"

import { factory } from "../comment"
import {
  NO_METHOD,
  NO_DEFAULT_EXPORT,
  UNEXPECTED_REQUIRED_PARAMETER,
  UNEXPECTED_SPLAT_ARGS,
  PREFER_TEMPLATED_STRINGS,
  PREFER_STRICT_EQUALITY,
  NO_PARAMETER,
  PREFER_EXPLICIT_RETURN_TYPE_FOR_PUBLIC_API,
  UNEXPECTED_BOXED_TYPE
} from "../generic/generic_comments"
import { createTypeAnnotation } from "../generic/create_type_annotation";

const OPTIMISE_DEFAULT_VALUE = factory`
  You currently use a conditional to branch in case there is no value passed in
  to twoFer, but instead you could set the default value to 'you' to avoid
  this conditional.
`('typescript.two-fer.optimise_default_value')

const OPTIMISE_EXPLICIT_DEFAULT_VALUE = factory<'parameter' | 'maybe_undefined_expression'>`
  Instead of relying on ${'maybe_undefined_expression'} being "undefined" when
  no value is passed in, you could set the default value of '${'parameter'}' to
  'you'.
`('typescript.two-fer.optimise_explicity_default_value')

const REDIRECT_INCORRECT_STRING_TEMPLATE = factory`
  The string template looks incorrect. Expected a template with 3 components.
`('typescript.two-fer.redirect_incorrect_string_template')

export class TwoFerAnalyzer extends BaseAnalyzer {

  private program!: Program
  private source!: string

  private _mainMethod!: ReturnType<typeof extractMainMethod>
  private _mainExport!: ReturnType<typeof extractDefaultExport>

  get mainMethod() {
    if (!this._mainMethod) {
      this._mainMethod = extractMainMethod(this.program, 'twoFer')
    }
    return this._mainMethod
  }

  get mainExport() {
    if (!this._mainExport) {
      this._mainExport = extractDefaultExport(this.program)
    }
    return this._mainExport
  }

  public async execute(): Promise<void> {
    const [parsed] = await TwoFerAnalyzer.parse(this.solution)

    this.program = parsed.program
    this.source = parsed.source

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    this.checkStructure()

    // Now we want to ensure that the method signature is sane and that it has
    // valid arguments
    this.checkSignature()

    // There are a handful optimal solutions for two-fer which needs no comments
    // and can just be approved. If we have it, then let's just acknowledge it
    // and get out of here.
    this.checkForOptimalSolutions()

    // We often see solutions that are correct but use different string
    // concatenation options (e.g. String#+, Array#join, etc). We'll approve
    // these but want to leave a comment that introduces them to string
    // templates in case they don't know about it.
    //
    // Additionally there are correct solutions which don't use the default
    // argument but instead rely of the falsy nature of undefined. We'll approve
    // these but want to leave a comment that introduces them to string
    // templates in case they don't know about it.
    this.checkForApprovableSolutions()

    // The most common error in twofer is people using conditionals to check
    // where the value passed in is nil, rather than using a default value. We
    // want to check for conditionals and tell the user about the default
    // parameter if we see one.
    this.checkForConditionalOnDefaultArgument()

    // Sometimes people specify the names (if name == "Alice" ...). If we do
    // this, suggest using string templates to make us of the parameter, rather
    // than using a conditional on it.
    //

    // The solution is automatically referred to the mentor if it reaches this
  }

  private checkStructure() {
    const method = this.mainMethod
    const [declaration,] = this.mainExport

    // First we check that there is a two-fer function and that this function
    // is exported.
    if (!method) {
      this.comment(NO_METHOD({ method_name: 'twoFer' }))
    }

    if (!declaration) {
      this.comment(NO_DEFAULT_EXPORT())
    }

    // TODO: test if method is inside the namespace that is exported

    if (this.hasCommentary) {
      this.disapprove()
    }
  }

  private checkSignature() {
    const method: MainMethod = this.mainMethod!

    // If there is no parameter then this solution won't pass the tests.
    if (method.params.length === 0) {
      this.disapprove(NO_PARAMETER({ function_name: method.id!.name }))
    }

    const firstParameter = method.params[0]

    // If the first parameter doesn't have a default value or is not optional,
    // then this won't pass the tests.
    if (
         firstParameter.type === AST_NODE_TYPES.Identifier
      && firstParameter.optional !== true
    ) {
      const parameterType =
           firstParameter.typeAnnotation
        && createTypeAnnotation(firstParameter.typeAnnotation)
        || 'any'
      this.disapprove(UNEXPECTED_REQUIRED_PARAMETER({
        parameter_name: firstParameter.name,
        parameter_type: parameterType
      }))
    }

    // If they provide a splat, the tests can pass but we should suggest they
    // use a real parameter.
    if (firstParameter.type === AST_NODE_TYPES.RestElement) {
      const splatArgName =
           firstParameter.argument.type === AST_NODE_TYPES.Identifier
        && firstParameter.argument.name
        || undefined
      const splatArgType =
           firstParameter.typeAnnotation
        && createTypeAnnotation(firstParameter.typeAnnotation)
        || 'any'
      this.disapprove(UNEXPECTED_SPLAT_ARGS({ 'splat_arg_name': splatArgName, parameter_type: splatArgType }))
    }

    // If they use a boxed type, bail with a message.
    const typeAnnotation = (
           firstParameter.type === AST_NODE_TYPES.Identifier
        && firstParameter.typeAnnotation
      ) || (
           firstParameter.type === AST_NODE_TYPES.AssignmentPattern
        && firstParameter.left.type === AST_NODE_TYPES.Identifier
        && firstParameter.left.typeAnnotation
      )

    if (typeAnnotation && typeAnnotation.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference) {
      const boxedType = typeAnnotation.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier
        && typeAnnotation.typeAnnotation.typeName.name

      if (!boxedType) {
        // Don't know what to make of this
        // TODO: add a comment for the mentor why this was redirected
        this.redirect()
      } else {
        this.disapprove(UNEXPECTED_BOXED_TYPE({
          boxed_type: boxedType,
          literal_type: boxedType[0].toLowerCase() + boxedType.slice(1)
        }))
      }
    }

    // If they have not given a return type, let's suggest they add it.
    if (
        !method.returnType
      || method.returnType.typeAnnotation.type !== AST_NODE_TYPES.TSStringKeyword
    ) {
      // TODO create actual signature
      this.comment(PREFER_EXPLICIT_RETURN_TYPE_FOR_PUBLIC_API({
        signature: 'twoFer(param: ...)'
      }))
    }
  }

  private checkForOptimalSolutions() {
    // The optional solution looks like this:
    //
    // export function twoFer(name = 'you') {
    //   return "One for #{name}, one for me."
    // }
    //
    // The default argument must be 'you', and it must just be a single
    // statement using interpolation. Other solutions might be approved but this
    // is the only one that we would approve without comment.
    //
    // NOTE: the current tests are incorrect and want you to do name || 'you'

    if (
         !this.isDefaultArgumentOptimal()
      || !this.isOneLineSolution()
      || !this.isUsingTemplatedString()
    ) {
      // continue analyzing
      this.logger.log('~> Solution is not optimal')
      return
    }

    // If the interpolation has more than three components, then they've
    // done something weird, so let's get a mentor to look at it!
    if (!this.hasThreeComponentsInTemplateLiteral()) {
      this.redirect(REDIRECT_INCORRECT_STRING_TEMPLATE())
    }

    this.approve()
  }

  private checkForApprovableSolutions() {
    // If we don't have a correct default argument or a one line
    // solution then let's just get out of here.
    if (!this.isOneLineSolution()) {
      return
    }

    this.checkForSolutionWithFalsyDefault()

    if (!this.isDefaultArgumentOptimal()) {
      if (this.hasCommentary) {
        this.disapprove()
      }
      return
    }

    this.checkForSolutionWithoutStringTemplate()

    if (this.hasCommentary) {
      this.approve()
    } else {
      // If we have a one-line method that passes the tests, then it's not
      // something we've planned for, so let's refer it to a mentor
      this.redirect()
    }
  }

  private checkForSolutionWithoutStringTemplate() {
    const [expression] = extractAll<BinaryExpression>(this.mainMethod!, AST_NODE_TYPES.BinaryExpression)

    //
    // "One for " + name + ", one for me."
    //
    if (
         expression
      && expression.operator === '+'
      && (
           expression.left.type === AST_NODE_TYPES.Literal
        || expression.right.type === AST_NODE_TYPES.Literal
      )
    ) {
      this.comment(PREFER_TEMPLATED_STRINGS())
    }
  }

  private checkForSolutionWithFalsyDefault() {
    //
    // "One for " + (name || 'you') + ", one for me."
    // `One for ${name || 'you'}, one for me.`
    //
    const expression = extractFirst<LogicalExpression>(this.mainMethod!, AST_NODE_TYPES.LogicalExpression)

    if (
         expression
      && expression.operator === '||'
      && expression.left.type === AST_NODE_TYPES.Identifier
    ) {

      if (
        (
             expression.right.type === AST_NODE_TYPES.Literal
          && expression.right.value === 'you'
        ) || (
             expression.right.type === AST_NODE_TYPES.TemplateLiteral
          && expression.right.quasis[0]
          && expression.right.quasis[0].value.raw === 'you'
        )
      ) {
        const firstParameter = this.mainMethod!.params[0]
        const parameter =
            firstParameter.type === AST_NODE_TYPES.AssignmentPattern
          && firstParameter.left.type === AST_NODE_TYPES.Identifier
          && firstParameter.left.name
          || 'name'


        this.comment(OPTIMISE_EXPLICIT_DEFAULT_VALUE({
          parameter,
          maybe_undefined_expression: expression.left.name
        }))
      }

      return
    }


    // `One for ${name ? name : 'you'}, one for me.`
    const conditionalExpression = extractFirst<ConditionalExpression>(this.mainMethod!, AST_NODE_TYPES.ConditionalExpression)
    if (
         conditionalExpression
      && conditionalExpression.test.type === AST_NODE_TYPES.Identifier
      && conditionalExpression.consequent.type === conditionalExpression.test.type
      && conditionalExpression.consequent.name === conditionalExpression.test.name
     ) {

      if (
        (
             conditionalExpression.alternate.type === AST_NODE_TYPES.Literal
          && conditionalExpression.alternate.value === 'you'
        ) || (
             conditionalExpression.alternate.type === AST_NODE_TYPES.TemplateLiteral
          && conditionalExpression.alternate.quasis[0]
          && conditionalExpression.alternate.quasis[0].value.raw === 'you'
        )
      ) {
        const firstParameter = this.mainMethod!.params[0]
        const parameter =
            firstParameter.type === AST_NODE_TYPES.AssignmentPattern
          && firstParameter.left.type === AST_NODE_TYPES.Identifier
          && firstParameter.left.name
          || 'name'

        this.comment(OPTIMISE_EXPLICIT_DEFAULT_VALUE({
          parameter,
          maybe_undefined_expression: conditionalExpression.consequent.name
        }))
      }
     }
  }

  private checkForConditionalOnDefaultArgument() {
    const conditionalExpressions = extractAll<ConditionalExpression>(this.mainMethod!, AST_NODE_TYPES.ConditionalExpression)
    const ifStatements = extractAll<IfStatement>(this.mainMethod!, AST_NODE_TYPES.IfStatement)

    if (
         ifStatements.length === 0
      && conditionalExpressions.length === 0
      || (ifStatements.length + conditionalExpressions.length > 1)
    ) {
      // If there are no ifs or ? : or if there is more than one, we have not
      // accounted for it so bail out.
      return
    }

    const [ifStatement] = ifStatements
    if (ifStatement) {
      // if (!name)
      if (
           ifStatement.test.type === AST_NODE_TYPES.UnaryExpression
        && ifStatement.test.operator === "!"
        && ifStatement.test.argument.type === AST_NODE_TYPES.Identifier
      ) {
        this.disapprove(OPTIMISE_DEFAULT_VALUE())
      }

      // if (name === undefined)
      // if (undefined === name)
      // if (name === '')           => old test
      // if ('' ==== name)          => old test
      if (
        ifStatement.test.type === AST_NODE_TYPES.BinaryExpression
        && ifStatement.test.operator === "==="
        && ifStatement.test.left.type === AST_NODE_TYPES.Identifier
        && ifStatement.test.right.type === AST_NODE_TYPES.Identifier
        && [ifStatement.test.left.name, ifStatement.test.right.name].includes('undefined')
      ) {
        this.disapprove(OPTIMISE_DEFAULT_VALUE())
      }

      // if (name == false)
      // if (name == undefined)
      // if (name == null)
      // if (name == '')
      // if (false == name)
      // if (undefined == name)
      // if (null == name)
      // if ('' == name)
      if (
        ifStatement.test.type === AST_NODE_TYPES.BinaryExpression
        && ifStatement.test.operator === "=="
        && [ifStatement.test.left.type, ifStatement.test.right.type].includes(AST_NODE_TYPES.Identifier)
      ) {
        this.comment(PREFER_STRICT_EQUALITY())
        this.disapprove(OPTIMISE_DEFAULT_VALUE())
      }

      return
    }

    const [{ consequent, alternate }] = conditionalExpressions
    if (
         (consequent.type === AST_NODE_TYPES.Literal && alternate.type === AST_NODE_TYPES.Identifier)
      || (consequent.type === AST_NODE_TYPES.Identifier && alternate.type === AST_NODE_TYPES.Literal)
    ) {
      this.disapprove(OPTIMISE_DEFAULT_VALUE())
    }
  }

  private isDefaultArgumentOptimal() {
    const parameter = this.mainMethod!.params[0]
    return parameter.type === AST_NODE_TYPES.AssignmentPattern
      && parameter.right
      && parameter.right.type === AST_NODE_TYPES.Literal
      && parameter.right.value === 'you'
  }

  private isOneLineSolution() {
    // Maximum body count may be 2 (3 - 1)
    //
    // -: class TwoFer {
    // 1:   static twoFer(name = 'you') {
    // 2:     return ...
    // 3:   }
    // -: }
    // -:
    // -: export default TwoFer
    //
    // but can also be less:
    //
    // -: export default class TwoFer {
    // 1:   static twoFer = (name = 'you') => ...
    // -: }
    //
    const body = this.mainMethod!.body!

    // This trick actually looks to the inner exppresion instead of the entire
    // function in order to allow for comments inside the body.
    const { loc: { start: { line: lineStart }, end: { line: lineEnd } } } =
         body.type === AST_NODE_TYPES.BlockStatement
      && body.body.length === 1
      && body.body[0].type === AST_NODE_TYPES.ReturnStatement
       ? body.body[0]
       : this.mainMethod!

    return (lineEnd - lineStart) <= 2
  }

  private isUsingTemplatedString() {
    return extractFirst<TemplateLiteral>(this.mainMethod!, AST_NODE_TYPES.TemplateLiteral)
  }

  private hasThreeComponentsInTemplateLiteral() {
    const template = extractFirst<TemplateLiteral>(this.mainMethod!, AST_NODE_TYPES.TemplateLiteral)
    return template
      && template.quasis.length + template.expressions.length === 3
  }
}

