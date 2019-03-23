class TwoFer {
  static twoFer(_input?:string) {
    if (_input) {
        return 'One for ' + _input + ', one for me.';
      }
  else {
      return 'One for you, one for me.';
    }
  }
}

export default TwoFer
