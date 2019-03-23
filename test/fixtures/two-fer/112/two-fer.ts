class TwoFer {
  static twoFer( name?: string ) {
    if (name === undefined){
      return 'One for you, one for me.'
    } else {
      return 'One for ' + name + ', one for me.';
    }
  }
}

console.log(TwoFer.twoFer('Alice'));

export default TwoFer
