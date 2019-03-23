class TwoFer {
  static twoFer(name: string = '') {
    if(name == '' || name == null) {
      return 'One for you, one for me.';
    }
    return 'One for $name, one for me.'.replace('$name', name);
  }
}

export default TwoFer
