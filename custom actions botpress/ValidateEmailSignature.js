/**
   * Validates Email Signature
   * @title Email Signature validation utility
   * @category Utility
   * @author Abhishek Raj Simon
   * @param {string} value - Pass email here
   */
  const myAction = async value => {
    const userId = event.target
    const botId = event.botId
    const emailString = value
    const emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i
    console.log(emailString)
    temp.isEmailValid = emailfilter.test(emailString)
  }
  return myAction(args.value)