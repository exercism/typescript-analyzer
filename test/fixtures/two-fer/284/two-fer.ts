class TwoFer {
  static twoFer = (name: string = 'you'): string => `One for ${name || 'you'}, one for me.`
}

export default TwoFer
