class TwoFer {
  static twoFer( name:string = 'Alice') {
   return `One for ${name || 'you'}, one for me.`;
}
}
export default TwoFer
