import React from 'react'
import { registerRootComponent } from 'expo'

import App from './App'

const AppContainer = () => (
  <App />
)

export default registerRootComponent(AppContainer)
