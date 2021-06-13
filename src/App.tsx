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
    <Stack.Screen
      name='UsersList'
      component={UsersList}
      options={{ title: 'Users list' }}
    />
    <Stack.Screen
      name='CreateUser'
      component={CreateUser}
      options={{ title: 'Register a new user' }}
    />
    <Stack.Screen
      name='UserDetail'
      component={UserDetail}
      options={{ title: 'User detail' }}
    />
  </Stack.Navigator>
)

const App = () => (
  <MyStack />
)

export default App
