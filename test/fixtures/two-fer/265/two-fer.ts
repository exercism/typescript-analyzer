class TwoFer {
  static twoFer(msg: string="") {
    if (msg === "") return "One for you, one for me."
    return "One for "+ msg + ", one for me."
  }
}

export default TwoFer
