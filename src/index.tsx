import React from 'react'
import { registerRootComponent } from 'expo'
import { NavigationContainer  } from '@react-navigation/native'

import App from './App'

const AppContainer = () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
)

export default registerRootComponent(AppContainer)
