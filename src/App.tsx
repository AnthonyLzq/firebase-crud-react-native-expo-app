import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import UsersList from './screens/UsersList'
import CreateUser from './screens/CreateUser'
import UserDetail from './screens/UserDetail'

const Stack = createStackNavigator()

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='CreateUser' component={CreateUser} />
    <Stack.Screen name='UsersList' component={UsersList} />
    <Stack.Screen name='UsUserDetailerList' component={UserDetail} />
  </Stack.Navigator>
)

const App = () => {
  return (
    <MyStack />
  )
}

export default App