import { factory } from '~src/comments/comment'

describe(`Comment Factory (simple)`, () => {
  const templatable = factory`
    simple example
  `

  it('generates a templatable factory', () => {
    // Takes two arguments
    expect(templatable).toBeInstanceOf(Function)
    expect(templatable).toHaveLength(2)
  })

  describe('templatable factory', () => {
    const parametarable = templatable('test.typescript.simple')

    it('generates a parametered comment factory', () => {
      expect(parametarable).toBeInstanceOf(Function)
    })

    describe('comment generation', () => {
      const comment = parametarable()

      it('generates the message', () => {
        expect(comment.message).toBe('simple example')
      })

      it('assigns the external template identifier', () => {
        expect(comment.externalTemplate).toBe('test.typescript.simple')
      })

      it("doesn't modify the original template", () => {
        expect(comment.template).toBe('simple example')
      })

      it('has an empty set of variables if none are passed', () => {
        expect(comment.variables).toEqual({})
      })
    })
  })
})
