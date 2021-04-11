import { findAll } from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'

type Node = TSESTree.Node
export function extractNamedClass(
  name: string,
  root: Node
): TSESTree.ClassDeclaration | undefined {
  return findAll(
    root,
    (node): node is TSESTree.ClassDeclaration =>
      node.type === AST_NODE_TYPES.ClassDeclaration
  ).find((declaration) => declaration.id && declaration.id.name === name)
}
