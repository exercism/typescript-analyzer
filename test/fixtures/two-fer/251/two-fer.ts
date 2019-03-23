class TwoFer {
  static twoFer(who?: string) {
    const forWho = who ? who : "you"
    return `One for ${forWho}, one for me.`
  }
}

export default TwoFer
