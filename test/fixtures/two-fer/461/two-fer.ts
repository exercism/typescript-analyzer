class TwoFer {
  static twoFer( name: string = 'you') : string {
    return `One for ${name}, one for me.`
  }
}

export default TwoFer

/* If the given name is "Alice", the result should be "One for Alice, one for me." 
If no name is given, the result should be "One for you, one for me." */