import { isNull } from "util";

class TwoFer {
  
  static twoFer(name: string) {
    if(isNull(name) || name.length == 0) {
      name = 'you';
    }
    return 'One for ' + name + ', one for me.';
  }
}

export default TwoFer
