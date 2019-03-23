class TwoFer {

  static twoFer(name?: string) {

    if (name) {
      return `One for ${name}, one for me.`
    }
    else {
      return `One for you, one for me.`
    }
    
  }

}

export default TwoFer


// using backticks to insert variables into your string
