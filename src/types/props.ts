import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  UsersList : undefined
  CreateUser: undefined
  UserDetail: { id: string }
}

type UsersListNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'UsersList'>
}

type UserDetailRouteProp = {
  route: RouteProp<RootStackParamList, 'UserDetail'>
}

type CreateUserNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateUser'>
}

export {
  UsersListNavigationProp,
  UserDetailRouteProp,
  CreateUserNavigationProp
}
