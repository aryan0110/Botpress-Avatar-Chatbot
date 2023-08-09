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
    const incomeString = value.replace(/[^0-9]/g,'');
    const numberfilter = /^\d+$/i
    if (numberfilter.test(incomeString)) {
      const income = parseInt(incomeString)
      temp.incomeIsValid = true
      temp.uincome = income
    } else {
      temp.incomeIsValid = false
    }
  }

  return myAction(args.value)