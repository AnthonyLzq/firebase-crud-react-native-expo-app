import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'

import { ACECOM_WD } from '@env'
import { db } from '../database/firebase'
import { UserDetailRouteProp } from '../types/props'
import CustomText from './components/CustomText'
import { IUser } from '../interfaces'
import { emptyUser } from '../utils'

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
  }
})

const UserDetail = ({ route: { params: { id } } }: UserDetailRouteProp) => {
  const [user, setUser] = React.useState<IUser>(emptyUser)

  const getUserById = React.useCallback(async (): Promise<void> => {
    const user = await db.collection('users').doc(id).get()
    setUser({
      ...user.data()
    } as IUser)
  }, [])

  React.useEffect(() => {
    getUserById()
  }, [])

  return (
    <ScrollView style={classes.container}>
      <View style={classes.imageContainer}>
        <Image style={classes.image} source={{ uri: ACECOM_WD }}/>
      </View>
      <CustomText id={'Name'} value={user.name} />
      <CustomText id={'Email'} value={user.email} />
      <CustomText id={'Phone'} value={user.phone} />
    </ScrollView>
  )
}

export default UserDetail
