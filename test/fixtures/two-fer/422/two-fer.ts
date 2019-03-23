class TwoFer {
  static twoFer(name: string = "") {
    return `One for ${(name === "") ? "you" : name}, one for me.`
  }
}

export default TwoFer