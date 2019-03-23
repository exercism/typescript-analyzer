/**
 * Handles "two fer", short for "two for one"
 */
class TwoFer {
  /**
   * Returns "One for you and one for me" when `name` is empty
   * or "One for `name`, one for me" when `name` is given.
   * 
   */
  static twoFer(name: string = 'you'): string {
    return `One for ${name}, one for me.`;
  }
}

export default TwoFer
