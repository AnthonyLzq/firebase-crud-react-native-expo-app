import React from 'react'
import { Button, ScrollView, StyleSheet, TextInput, View } from 'react-native'

import { ICreateUserState } from '../interfaces'

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
          onPress={() => console.log({ user})}
          title='Save user'
        />
      </View>
    </ScrollView>
  )
}

export default CreateUser
