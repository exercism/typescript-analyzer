class TwoFer {
  static twoFer( /* Parameters go here */ name?: string) {
    // Your code here
    if(!name){
      return 'One for you, one for me.'
    }else{
      return `One for ${name}, one for me.`;
    }
  }
}

export default TwoFer
