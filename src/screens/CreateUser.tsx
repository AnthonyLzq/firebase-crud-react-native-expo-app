import React from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-root-toast'

import CustomTextInput from './components/CustomTextInput'
import { IUser } from '../interfaces'
import { RE_EMAIL, RE_PHONE, toastOptions } from '../utils'
import { db } from '../database/firebase'
import Props from '../types/props'

const SPINNER_COLOR = '#222'

const classes = StyleSheet.create({
  container: {
    flex   : 1,
    padding: 35
  },
  spinnerTextStyle: {
    color: SPINNER_COLOR
  }
})

const emptyUser: IUser = {
  name : '',
  email: '',
  phone: ''
}

const CreateUser = ({ navigation }: Props) => {
  const [user, setUser] = React.useState<IUser>(emptyUser)
  const [isEditable, setIsEditable] = React.useState(true)
  const [isDisable, setIsDisable] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const returnTextInputAndButtonToTheirInitialValue = React.useCallback(
    (reverse: boolean = false): void => {
      if (reverse) {
        setIsDisable(true)
        setIsEditable(false)
        setIsLoading(true)
      } else {
        setIsDisable(false)
        setIsEditable(true)
        setIsLoading(false)
      }
    },
    []
  )

  const handleChangeText = (
    propertyName: 'name' | 'email' | 'phone',
    value       : string
  ): void => setUser({
    ...user,
    [propertyName]: value ? value : ''
  })

  const showToastAndEnableInputAndButton = (message: string): void => {
    Toast.show(message, toastOptions())
    setIsDisable(false)
    setIsEditable(true)
  }

  const validateInput = (): boolean => {
    if (!user.name) {
      showToastAndEnableInputAndButton('Name is missing!')

      return false
    } else if (user.name.length < 2) {
      showToastAndEnableInputAndButton('The name you\'ve entered is invalid')

      return false
    }

    if (!user.email) {
      showToastAndEnableInputAndButton('Email is missing')

      return false
    } else if (!RE_EMAIL.test(user.email.toLocaleLowerCase())) {
      showToastAndEnableInputAndButton('The email you\'ve entered is not valid')

      return false
    }

    if (!user.phone) {
      showToastAndEnableInputAndButton('Phone is missing!')

      return false
    } else if (!RE_PHONE.test(user.phone.toLocaleLowerCase())) {
      showToastAndEnableInputAndButton('The phone you\'ve entered is not valid')

      return false
    }

    return true
  }

  const saveNewUser = async (): Promise<void> => {
    returnTextInputAndButtonToTheirInitialValue(true)
    const isValidated = validateInput()

    if (!isValidated) {
      returnTextInputAndButtonToTheirInitialValue()

      return
    }

    try {
      const foundUsers = await db
        .collection('users')
        .where('name', '==', user.name)
        .where('email', '==', user.email)
        .where('phone', '==', user.phone)
        .get()

      if (foundUsers.docs.length > 0) {
        Toast.show('Ups! That user is already registered!', toastOptions())
        returnTextInputAndButtonToTheirInitialValue()

        return
      }

      await db.collection('users').add({ ...user })
      Toast.show('User saved!', toastOptions())
      setUser(emptyUser)
      returnTextInputAndButtonToTheirInitialValue()
      navigation.navigate('UsersList')
    } catch (error) {
      Toast.show('Ups! Something went wrong. Please, try again', toastOptions())
    }
  }

  return (
    <ScrollView style={classes.container}>
      <Spinner
        color={SPINNER_COLOR}
        textContent='Loading...'
        textStyle={classes.spinnerTextStyle}
        visible={isLoading}
      />
      <CustomTextInput
        isEditable={isEditable}
        onChangeText={text => handleChangeText('name', text)}
        placeHolder='User name'
        value={user.name}
      />
      <CustomTextInput
        isEditable={isEditable}
        onChangeText={text => handleChangeText('email', text)}
        placeHolder='User email'
        value={user.email}
      />
      <CustomTextInput
        isEditable={isEditable}
        onChangeText={text => handleChangeText('phone', text)}
        placeHolder='User Phone'
        value={user.phone}
        keyboardType='phone-pad'
      />
      <View style={{ paddingTop: 10 }}>
        <Button
          onPress={saveNewUser}
          title='Save user'
          disabled={isDisable}
        />
      </View>
    </ScrollView>
  )
}

export default CreateUser
