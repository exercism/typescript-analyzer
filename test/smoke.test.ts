import { TwoFerAnalyzer } from '~src/analyzers/practice/two-fer'
import { run } from '~src/utils/runner'
import { find } from '~src/analyzers/Autoload'

import { bootstrap } from '~test/helpers/bootstrap'
import { InlineInput } from '@exercism/static-analysis'

const { options, exercise } = bootstrap({ exercise: 'two-fer' })

describe('When running analysis', () => {
  it('can approve as optimal', async () => {
    const solutionContent = `
    export default class TwoFer {
      static twoFer(name: string = "you"): string {
        return \`One for \${name}, one for me.\`
      }
    }
    `.trim()

    const analyzer = new TwoFerAnalyzer()
    const input = new InlineInput([solutionContent])
    const output = await run(analyzer, input, options)

    expect(output.comments.length).toBe(0)
  })

  it('can approve with comment', async () => {
    const solutionContent = `
    class TwoFer {
      static twoFer(name: string = "you") {
        return \`One for \${name}, one for me.\`
      }
    }

    export default TwoFer
    `.trim()

    const analyzer = new TwoFerAnalyzer()
    const input = new InlineInput([solutionContent])
    const output = await run(analyzer, input, options)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
  })

  it('can dissapprove with comment', async () => {
    const solutionContent = `
    class TwoFer {
      static twoFer(name: string) {
        return \`One for \${name || 'you'}, one for me.\`;
      }
    };

    export default TwoFer
    `.trim()

    const analyzer = new TwoFerAnalyzer()
    const input = new InlineInput([solutionContent])
    const output = await run(analyzer, input, options)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    expect(output.comments[0].type).toBe('actionable')
  })
})

describe('When autoloading analyzers', () => {
  it('can find an analyzer based on an exercise', () => {
    const ActualAnalyzer = find(exercise)
    expect(ActualAnalyzer).toBe(TwoFerAnalyzer)
  })
})
