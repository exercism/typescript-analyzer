class TwoFer {
  static twoFer(name?:string) {
    // Your code here
	let X:string;
	
	if (name){
		X = name;
	}else{
		X = "you";
	}
	
	return "One for " + X + ", one for me.";
  }
}

export default TwoFer
