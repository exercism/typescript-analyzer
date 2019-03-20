import path from 'path'

import { BaseAnalyzer } from "./analyzers/base_analyzer"

import { ExecutionOptions } from "./utils/execution_options"
import { get as getLogger } from "./utils/logger"

export async function run(analyzer: BaseAnalyzer, options: ExecutionOptions) {
  const { output, dry, inputDir } = options
  const logger = getLogger()

  const analysis = await analyzer.run()
  logger.log(`=> output: \n\n${analysis.toString()}\n`)

  if (dry) {
    logger.log("=> running dry, no writing to file")
  } else {
    const outputPath = path.isAbsolute(output)
      ? output
      : path.join(inputDir, output)

    logger.log(`=> writing to ${outputPath}`)

    await analysis.writeTo(outputPath)
  }

  logger.log('=> DONE')
}
