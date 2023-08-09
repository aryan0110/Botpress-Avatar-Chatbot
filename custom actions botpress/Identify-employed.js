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
    const typeString = value.toLowerCase()
    if (typeString.includes('salaried')) {
      temp.etype = 'Salaried'
    } else if (typeString.includes('self')) {
      temp.etype = 'Self-Employed'
    }
  }

  return myAction(args.value)