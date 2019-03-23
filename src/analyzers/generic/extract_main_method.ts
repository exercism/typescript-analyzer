import { Program, Node, FunctionDeclaration, ArrowFunctionExpression, MethodDefinition, ClassProperty, FunctionExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import traverser from 'eslint/lib/util/traverser'

export type MainMethod = FunctionDeclaration | ArrowFunctionExpression | FunctionExpression
export function extractMainMethod(program: Program, name: string): MainMethod | undefined {
  let result: MainMethod | undefined = undefined

  traverser.traverse(program, {
    enter(node: Node) {
      switch (node.type) {

        // function name() {}
        case AST_NODE_TYPES.FunctionDeclaration:
          if (node.id && node.id.name === name) {
            result = node
            this.break()
          }
          break;

        case AST_NODE_TYPES.VariableDeclaration:
          this.skip()

          traverser.traverse(node, {
            enter(innerNode: Node) {
              switch(innerNode.type) {

                // const name = () => {}
                case AST_NODE_TYPES.VariableDeclarator:
                  if (innerNode.id.type === AST_NODE_TYPES.Identifier) {
                    if (
                         innerNode.id.name === name
                      && innerNode.init
                      && innerNode.init.type === AST_NODE_TYPES.ArrowFunctionExpression
                    ) {
                      result = innerNode.init
                      this.break()
                    }
                  }
              }
            }
          })

          if (result) {
            this.break()
          }
          break;

          // class Foo {
          //   name() {}
          // }
          case AST_NODE_TYPES.MethodDefinition:
            this.skip()
            if (
              node.static
              && node.key.type === AST_NODE_TYPES.Identifier
              && node.key.name === name
            ) {
              switch(node.value.type) {
                case AST_NODE_TYPES.FunctionExpression:
                  result = node.value
                  this.break()
                  break;
              }
            }

          // class Foo {
          //   static name = () => {}
          //   static name = name() {}
          //   static name = function name() {}
          // }
          case AST_NODE_TYPES.ClassProperty:
            this.skip()

            if (
                 node.static
              && node.key.type === AST_NODE_TYPES.Identifier
              && node.key.name === name
            ) {
              switch(node.value.type) {
                case AST_NODE_TYPES.ArrowFunctionExpression:
                case AST_NODE_TYPES.FunctionExpression:
                  result = node.value
                  this.break()
                  break;
              }
            }
            break;
      }

    },
  })

  return result
}
