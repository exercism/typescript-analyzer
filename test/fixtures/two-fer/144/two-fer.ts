class TwoFer {
  static twoFer(name: string = "aLiCe") {
    const nameSet = name.split(' ', 1)
    let capitalized

    for (let i = 0; i < nameSet.length; i++) {
      capitalized = nameSet[i].charAt(0).toUpperCase()
      nameSet[i] = capitalized + nameSet[i].substr(1).toLowerCase()
    }
    nameSet.join(" ")

    let nameString = nameSet.toString()

    if ( nameString !== "Alice") {
      nameString = 'you'
    }

    const phrase = `One for ${nameString}, one for me.`
    return phrase

  }

}

export default TwoFer
