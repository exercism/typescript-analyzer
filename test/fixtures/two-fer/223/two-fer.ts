// class TwoFer {
//   static twoFer( name: string = "you" ) {
//     return 'One for ${name}, one for me.';
//   }
// }

// export default TwoFer

export default {
  twoFer: (name: string = "you" ) => {
    return 'One for ' + name + ', one for me.';
  }
}
//export default {
  //     hello: (name: string = "World") => {
  //         return `Hello, ${name}!`;
  //     }
  // };