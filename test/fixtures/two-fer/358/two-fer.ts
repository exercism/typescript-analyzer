class TwoFer {
  static twoFer(name: string = '') {
    if (name && name.length > 1) {
      return `One for ${name}, one for me.`;
    } else {
      return 'One for you, one for me.';
    }
  }
}

export default TwoFer;
