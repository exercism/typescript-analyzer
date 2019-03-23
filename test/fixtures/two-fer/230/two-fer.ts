class TwoFer {
  static twoFer( name?: string ): string {
    return name ? `One for ${name}, one for me.` :  'One for you, one for me.'
  }
}

export default TwoFer
