class TwoFer {
  static twoFer(person?: string) {
    if (person) {
      return 'One for ' + person + ', one for me.'
    } else {
      return 'One for you, one for me.'
    }
  }
}

export default TwoFer
