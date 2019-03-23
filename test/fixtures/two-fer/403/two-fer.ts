class TwoFer {
  static twoFer(who:string="") {
    // Your code here
    if(who === ""){
      return `One for you, one for me.`;
    }else{
      return `One for ${who}, one for me.`;
    }
  }
}

export default TwoFer
