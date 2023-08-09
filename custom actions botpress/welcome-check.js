
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
    const welcomeString = value.toLowerCase()
    if (welcomeString=='hi'||welcomeString=='hey'||welcomeString=='hello'||welcomeString=='hai'){temp.isWelcome==true}
    else{temp.isWelcome==false}
    
  }

  return myAction(args.value)