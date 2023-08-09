
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
    const heightString = value.replace(/[^0-9]/g, '')
    const numberfilter = /^\d+$/i
    if (numberfilter.test(heightString)) {
      const height = parseInt(heightString)
      if (height <= 250) {
        temp.heightIsValid = 1
        temp.uheight = height
      } else {
        temp.heightIsValid = 2
      }
    } else {
      temp.heightIsValid = 3
    }
  }

  return myAction(args.value)