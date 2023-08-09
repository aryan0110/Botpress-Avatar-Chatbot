
  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const myAction = async (name, value) => {
    const userId = event.target
    const botId = event.botId
    const childString = value.replace(/[^0-9]/g, '')
    const numberfilter = /^\d+$/i
    if (numberfilter.test(childString)==false) {
        temp.locationIsValid = true
        temp.location = childString
    } 
    else {
      temp.ncIsValid = false
    }
    
  }

  return myAction(args.name, args.value)