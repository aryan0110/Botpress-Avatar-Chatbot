  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const myAction = async (value) => {
    const userId = event.target
    const botId = event.botId
    const weightString = value.replace(/[^0-9]/g,'');
    const numberfilter = /^\d+$/i
    if (numberfilter.test(weightString)) {
      const weight = parseInt(weightString)
      if (weight<=200)
      {temp.weightIsValid = 1
      temp.uweight = weight;}
      else{temp.weightIsValid = 2}
    } 
    else {
      temp.weightIsValid = 3
    }
  }

  return myAction(args.value)