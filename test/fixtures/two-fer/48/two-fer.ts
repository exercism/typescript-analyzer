class TwoFer {
  static twoFer(name?: string) {
    // Your code here
    return name === undefined ? "One for you, one for me." : `One for ${name}, one for me.`
  }
}

export default TwoFer
