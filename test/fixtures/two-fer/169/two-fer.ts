class TwoFer {
  static twoFer(name?: String) {
    if(name)
      return "One for" + name + ", one for me.";
    else
      return "One for you, one for me.";
  }
}

export default TwoFer
