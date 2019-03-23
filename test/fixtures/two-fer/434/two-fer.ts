class TwoFer {
  static twoFer(name?: string) {
    return 'One for ' + ((typeof name === 'undefined') ? 'you' : name) + ', one for me.';
  }
}

export default TwoFer
