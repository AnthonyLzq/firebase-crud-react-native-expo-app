import Toast, { ToastOptions } from 'react-native-root-toast'
import { IToastGenerator } from '../interfaces'

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

export { toastOptions }
