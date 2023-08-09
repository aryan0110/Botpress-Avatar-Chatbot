
  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const myAction = async value => {
    const userId = event.target
    const botId = event.botId
    const ageString = value.replace(/[^0-9]/g,'');
    const numberfilter = /^\d+$/i
    if(numberfilter.test(ageString))
    {const age=parseInt(ageString)
      if(age<=100){temp.isAgeValid = 1;temp.uage=age}
      else{temp.isAgeValid = 2}
    }
    else
    {temp.isAgeValid = 3}
  }
  return myAction(args.value)