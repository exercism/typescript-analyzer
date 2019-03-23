class TwoFer {
  static twoFer(name?:string) {
    if (!name){
      name = "you";
    }
    return `One for ${name}, one for me.`
  }
}

export default TwoFer
