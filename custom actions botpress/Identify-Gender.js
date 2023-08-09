
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
    if (typeString.includes('male')||typeString.includes('man')||typeString.includes('men')){temp.ugender = 'Male'}
    else if(typeString.includes('female')||typeString.includes('woman')||typeString.includes('women')){temp.ugender = 'Female'}
  }

  return myAction(args.value)