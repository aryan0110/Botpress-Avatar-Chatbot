
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
    const typeString = value.toLowerCase()
    if (typeString.includes('life')){temp.itype = 'Life Insurance'}
    else if(typeString.includes('health')){temp.itype = 'Health Insurance'}
    else if (typeString.includes('property')){temp.itype = 'Property Insurance'}
  }
  return myAction(args.value)