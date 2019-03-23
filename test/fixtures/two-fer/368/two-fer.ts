class TwoFer {
  static twoFer( name?: string ) {
    return !name ? 'One for you, one for me.' : `One for ${name}, one for me.`
  }
}

export default TwoFer
