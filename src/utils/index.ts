import Toast, { ToastOptions } from 'react-native-root-toast'
import { IToastGenerator, IUser } from '../interfaces'

const RE_EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const RE_PHONE = /^\+(?:[0-9] ?){6,14}[0-9]$/

const toastOptions = ({
  animation = true,
  delay = 0,
  duration = Toast.durations.SHORT,
  hideOnPress = true,
  position = Toast.positions.BOTTOM,
  shadow = true,
  onShow = () => {},
  onShown = () => {},
  onHide = () => {},
  onHidden = () => {},
  onPress = () => {}
}: IToastGenerator = {}): ToastOptions => ({
  animation,
  delay,
  duration,
  hideOnPress,
  position,
  shadow,
  onShow,
  onShown,
  onHide,
  onHidden,
  onPress
})

const emptyUser: IUser = {
  name : '',
  email: '',
  phone: ''
}

export { RE_EMAIL, RE_PHONE, emptyUser, toastOptions }
