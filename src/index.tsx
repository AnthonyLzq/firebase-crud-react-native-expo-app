import React from 'react'
import { registerRootComponent } from 'expo'
import { NavigationContainer  } from '@react-navigation/native'
import { RootSiblingParent } from 'react-native-root-siblings'

import App from './App'

const AppContainer = () => (
  <RootSiblingParent>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </RootSiblingParent>
)

export default registerRootComponent(AppContainer)
