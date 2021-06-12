import React from 'react'
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import Toast from 'react-native-root-toast'

import { ICreateUserState } from '../interfaces'
import { toastOptions } from '../utils'
import { db } from '../database/firebase'

const classes = StyleSheet.create({
  container: {
    flex   : 1,
    padding: 35
  },
  inputGroup: {
    flex             : 1,
    padding          : 0,
    marginBottom     : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222'
  }
})

const CreateUser = () => {
  const [user, setUser] = React.useState<ICreateUserState>({
    name : '',
    email: '',
    phone: ''
  })

  const handleChangeText = (
    propertyName: 'name' | 'email' | 'phone',
    value       : string
  ): void => setUser({ ...user, [propertyName]: value ?? '' })

  const saveNewUser = async () => {
    if (!user.name) {
      Toast.show('Name is missing!', toastOptions())

      return
    }

    if (!user.email) {
      Toast.show('Email is missing!', toastOptions())

      return
    }

    if (!user.phone) {
      Toast.show('Phone is missing!', toastOptions())

      return
    }

    try {
      await db.collection('users').add({ ...user })
      Toast.show('User saved!', toastOptions())
    } catch (error) {
      Toast.show('Ups! Something went wrong. Please, try again', toastOptions())
    }
  }

  return (
    <ScrollView style={classes.container}>
      <View style={classes.inputGroup}>
        <TextInput
          onChangeText={text => handleChangeText('name', text)}
          placeholder='User name'
        />
      </View>
      <View style={classes.inputGroup}>
        <TextInput
          onChangeText={text => handleChangeText('email', text)}
          placeholder='User email'
        />
      </View>
      <View style={classes.inputGroup}>
        <TextInput
          onChangeText={text => handleChangeText('phone', text)}
          placeholder='User phone'
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button
          onPress={saveNewUser}
          title='Save user'
        />
      </View>
    </ScrollView>
  )
}

export default CreateUser
