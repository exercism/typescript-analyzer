class TwoFer {
  static twoFer(name?: string) {
    const forWho = name !== undefined ? name : "you";
    return `One for ${forWho}, one for me.`;
  }
}

export default TwoFer;
