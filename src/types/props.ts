import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  CreateUser: undefined
  UsersList : undefined
  UserDetail: { id: string }
}

type Props = StackScreenProps<RootStackParamList>

export default Props
