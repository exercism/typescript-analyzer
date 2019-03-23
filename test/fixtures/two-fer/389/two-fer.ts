class TwoFer {
  /**
   * One for me and one for everyone else
   * @param noun
   */
  static twoFer(noun: string = 'you'): string {
    return `One for ${noun}, one for me.`
  }
}

export default TwoFer
