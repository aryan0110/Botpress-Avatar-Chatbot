  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const myAction = async value => {
    const typeString = value.toLowerCase()
    if (typeString.includes('nri')) {
      temp.nritype = 'NRI'
    } else if (typeString.includes('india')) {
      temp.nritype = 'Indian'
    }
  }
  return myAction(args.value)