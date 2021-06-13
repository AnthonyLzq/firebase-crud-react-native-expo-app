import React from 'react'
import { LogBox } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

LogBox.ignoreLogs(['Setting a timer'])

import UsersList from './screens/UsersList'
import CreateUser from './screens/CreateUser'
import UserDetail from './screens/UserDetail'

const Stack = createStackNavigator()

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='UsersList' component={UsersList} />
    <Stack.Screen name='CreateUser' component={CreateUser} />
    <Stack.Screen name='UserDetail' component={UserDetail} />
  </Stack.Navigator>
)

const App = () => {
  return (
    <MyStack />
  )
}

export default App