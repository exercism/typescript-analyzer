class TwoFer {
    static twoFer(name?: string): string {
        let wordToUse = name ? name : "you";
        return `One for ${wordToUse}, one for me.`
    }
}

export default TwoFer
