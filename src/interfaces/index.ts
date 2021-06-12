interface ICreateUserState {
  name : string
  email: string
  phone: string
}

interface IToastGenerator {
  animation?  : boolean
  delay?      : number
  duration?   : number
  hideOnPress?: boolean
  position?   : number
  shadow?     : boolean
  onShow?     : () => void
  onShown?    : () => void
  onHide?     : () => void
  onHidden?   : () => void
  onPress?    : () => void
}

export { ICreateUserState, IToastGenerator }
