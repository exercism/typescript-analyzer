class TwoFer {
    static twoFer(name: string | null = null) {
        return `One for ${ name || 'you' }, one for me.`;
    }
}

export default TwoFer
