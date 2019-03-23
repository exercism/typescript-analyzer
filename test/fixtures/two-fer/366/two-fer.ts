class TwoFer {
  static twoFer(name: string = "" ): string {

    if (name == "Bob"){
      const text: string = 'One for ' +name+ ', one for me.' 
      return(text)
    }

    else if (name == "Alice"){
      const text: string = 'One for ' +name+ ', one for me.'
      return(text)
    }
    
    else {
      const text: string = 'One for you, one for me.'
      return(text)
    }
    
  }
}

export default TwoFer
