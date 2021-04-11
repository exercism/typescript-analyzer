import { ExtractedFunction, extractFunctions } from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'

type Node = TSESTree.Node

export function extractNamedFunction(
  name: string,
  root: Node
): ExtractedFunction | undefined {
  return extractFunctions(root).find((parsed) => parsed.name === name)
}
