const DEFAULT_PASSCODE_LENGTH = 25

export const generateFamilyPasscode = () => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length
    for ( let i = 0; i < DEFAULT_PASSCODE_LENGTH; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return result
  }