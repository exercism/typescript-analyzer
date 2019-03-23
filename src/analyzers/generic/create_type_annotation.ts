import { TSTypeAnnotation, TypeNode } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function createTypeAnnotation(typeAnnotation: TSTypeAnnotation): string {
  return annotate(typeAnnotation.typeAnnotation)
}

function annotate(typeNode: TypeNode): string {
  switch(typeNode.type) {
    case(AST_NODE_TYPES.TSAnyKeyword):
      return 'any'
    case (AST_NODE_TYPES.TSBooleanKeyword):
      return 'boolean'
    case (AST_NODE_TYPES.TSNullKeyword):
      return 'null'
    case (AST_NODE_TYPES.TSNeverKeyword):
      return 'never'
    case (AST_NODE_TYPES.TSNumberKeyword):
      return 'number'
    case (AST_NODE_TYPES.TSUndefinedKeyword):
      return 'undefined'
    case (AST_NODE_TYPES.TSUnionType):
      return typeNode.types.map(n => annotate(n)).join(' | ')
    case (AST_NODE_TYPES.TSUnknownKeyword):
      return 'unknown'
    case (AST_NODE_TYPES.TSVoidKeyword):
      return 'void'
    default:
      return 'unknown'
  }
}

