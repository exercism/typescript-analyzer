class TwoFer {
    static twoFer(name?: string) {
        // no name given
        if (!name) {
            return `One for you, one for me.`;
        }
        // a name given
        else {
            return `One for ${name}, one for me.`
        }
    }
}

export default TwoFer
