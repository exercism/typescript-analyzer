class TwoFer {
  static twoFer( name?: String ) {
    if(name == null){
      name = "you"
    }

    return "One for "+ name + ", one for me."
  }
}

export default TwoFer
