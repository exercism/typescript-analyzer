class TwoFer {
  static twoFer( name?: string ): string {
    let phrase: string
    if (name) {
      phrase = `One for ${name}, one for me.`
    } else {
      phrase = `One for you, one for me.`
    }
    return phrase
  }
}

export default TwoFer
