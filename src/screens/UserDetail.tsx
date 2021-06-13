import React from 'react'
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-root-toast'

import CustomTextInput from './components/CustomTextInput'
import { ACECOM_WD } from '@env'
import { db } from '../database/firebase'
import { UserDetailRouteProp } from '../types/props'
import { IUser } from '../interfaces'
import {
  RE_EMAIL,
  RE_PHONE,
  SPINNER_COLOR,
  emptyUser,
  toastOptions
} from '../utils'

const classes = StyleSheet.create({
  container: {
    flex   : 1,
    padding: 35
  },
  image: {
    borderRadius: 100,
    height      : 200,
    width       : 200
  },
  imageContainer: {
    alignItems  : 'center',
    flex        : 1,
    marginBottom: 10,
    marginTop   : 20
  },
  spinnerTextStyle: {
    color: SPINNER_COLOR
  }
})

const UserDetail = ({ route: { params: { id } } }: UserDetailRouteProp) => {
  const [currentUser, setCurrentUser] = React.useState<IUser>(emptyUser)
  const [user, setUser] = React.useState<IUser>(emptyUser)
  const [isLoading, setIsLoading] = React.useState(true)

  const getUserById = React.useCallback(async (): Promise<void> => {
    const user = await db.collection('users').doc(id).get()
    setUser({
      ...user.data()
    } as IUser)
    setCurrentUser({
      ...user.data()
    } as IUser)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    getUserById()
  }, [])

  const handleChangeText = (
    propertyName: 'name' | 'email' | 'phone',
    value       : string
  ): void => setUser({
    ...user,
    [propertyName]: value ? value : ''
  })

  const validateInput = (): boolean => {
    if (!user.name) {
      Toast.show('Name is missing!', toastOptions())

      return false
    } else if (user.name.length < 2) {
      Toast.show('The name you\'ve entered is invalid', toastOptions())

      return false
    }

    if (!user.email) {
      Toast.show('Email is missing', toastOptions())

      return false
    } else if (!RE_EMAIL.test(user.email.toLocaleLowerCase())) {
      Toast.show('The email you\'ve entered is not valid', toastOptions())

      return false
    }

    if (!user.phone) {
      Toast.show('Phone is missing!', toastOptions())

      return false
    } else if (!RE_PHONE.test(user.phone.toLocaleLowerCase())) {
      Toast.show('The phone you\'ve entered is not valid', toastOptions())

      return false
    }

    return true
  }

  const updateUser = (): void => {
    Alert.alert('Updating user', 'Are you sure?', [
      {
        text   : 'Yes',
        onPress: async() => {
          if (validateInput()) {
            if (
              user.name === currentUser.name &&
              user.email === currentUser.email &&
              user.phone === currentUser.phone
            ) {
              Toast.show(
                'Ups! You haven\'t updated anything!',
                toastOptions()
              )

              return
            }

            const foundUsers = await db
              .collection('users')
              .where('name', '==', user.name)
              .where('email', '==', user.email)
              .where('phone', '==', user.phone)
              .get()

            if (foundUsers.docs.length > 0) {
              Toast.show(
                'Ups! A user with this data is already registered in the system!',
                toastOptions()
              )

              return
            }

            try {
              await db.collection('users').doc(id).set({
                name : user.name,
                email: user.email,
                phone: user.phone
              })
            } catch (error) {
              Toast.show(
                'Ups! Something went wrong, please try again!',
                toastOptions()
                )
            }
          }
        }
      },
      {
        text   : 'No',
        onPress: () => {}
      }
    ])
  }

  const deleteUser = () => {
    Alert.alert('Deleting user', 'Are you sure?', [
      {
        text   : 'Yes',
        onPress: async() => {
          if (validateInput())
            try {
              await db.collection('users').doc(id).delete()
            } catch (error) {
              Toast.show(
                'Ups! Something went wrong, please try again!',
                toastOptions()
                )
            }
        }
      },
      {
        text   : 'No',
        onPress: () => {}
      }
    ])
  }

  return (
    <ScrollView style={classes.container}>
      <Spinner
        color={SPINNER_COLOR}
        textContent='Loading...'
        textStyle={classes.spinnerTextStyle}
        visible={isLoading}
      />
      <View style={classes.imageContainer}>
        <Image style={classes.image} source={{ uri: ACECOM_WD }}/>
      </View>
      <CustomTextInput
        onChangeText={text => handleChangeText('name', text)}
        placeHolder='User name'
        value={user.name}
      />
      <CustomTextInput
        onChangeText={text => handleChangeText('email', text)}
        placeHolder='User email'
        value={user.email}
      />
      <CustomTextInput
        onChangeText={text => handleChangeText('phone', text)}
        placeHolder='User Phone'
        value={user.phone}
        keyboardType='phone-pad'
      />
      <View style={{ paddingTop: 10 }}>
        <Button
          color='#19AC52'
          onPress={updateUser}
          title='Update user'
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button
          color='#E37399'
          onPress={deleteUser}
          title='Delete user'
        />
      </View>
    </ScrollView>
  )
}

export default UserDetail
