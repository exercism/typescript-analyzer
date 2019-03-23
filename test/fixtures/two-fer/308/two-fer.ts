class TwoFer {
  static twoFer(who?: string) {
    if (who)
      return `One for ${who}, one for me.`
    else
      return 'One for you, one for me.'
  }
}

export default TwoFer
