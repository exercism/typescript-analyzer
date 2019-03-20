import { Exercise } from '../exercise'
import { Solution } from '../solution'
import { ExecutionOptions } from './execution_options'

process.on('uncaughtException', function(err) {
  console.error(err)
  process.stderr.write(err.message)

  process.exit(-1)
})

const options = ExecutionOptions.create()
const exercise = new Exercise(options.exercise)
const solution = new Solution(options.inputDir, exercise)

export { exercise, solution, options }
