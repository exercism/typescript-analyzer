class TwoFer {
  static twoFer(name: string = "") {
    
    if (name.length > 0) {
      if (name === "Alice") {
        return "One for Alice, one for me."
      }

      else {
        return `One for ${name}, one for me.`
      }
    }
    else {
      return "One for you, one for me."
    }
  }
}

export default TwoFer
