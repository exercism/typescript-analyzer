import { TwoFerAnalyzer } from '~src/analyzers/two-fer'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new TwoFerAnalyzer())

describe('When running analysis on two-fer', () => {
  it('can approve as optimal', async () => {

    const solutionContent = `
    export default class TwoFer {
      static twoFer(name: string = "you"): string {
        return \`One for \${name}, one for me.\`
      }
    }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve');
    expect(output.comments.length).toBe(0);
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

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve');
    expect(output.comments.length).toBeGreaterThanOrEqual(1);
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

    const output = await analyze(solutionContent)

    expect(output.status).toBe('disapprove');
    expect(output.comments.length).toBeGreaterThanOrEqual(1);
  })

  it('can refer to mentor', async () => {

    const solutionContent = `
    const whomst = 'for'

    class TwoFer {
      static twoFer(name: string = "you") {
        return \`One \${whomst} \${name}, one \${whomst} me.\`;
      }
    }

    export default TwoFer
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('refer_to_mentor');
  })
})
