class TwoFer {
  static twoFer(name?: string | undefined) {
    return name === undefined ? 'One for you, one for me.' : `One for ${name}, one for me.`
  }
}

export default TwoFer
