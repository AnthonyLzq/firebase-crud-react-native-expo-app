import React from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

import { ACECOM_WD } from '@env'
import Props from '../types/props'
import { IUser } from '../interfaces'
import { db } from '../database/firebase'

const classes = StyleSheet.create({
  container: {
    flex   : 1,
    padding: 35
  }
})

const UsersList = ({ navigation }: Props) => {
  const [users, setUsers] = React.useState<IUser[]>([])

  React.useEffect(() => {
    db.collection('users').onSnapshot(querySnapShot => {
      const foundUsers: IUser[] = []

      querySnapShot.docs.forEach(doc => foundUsers.push({
        ...doc.data(),
        id: doc.id
      } as IUser))
      setUsers(foundUsers)
    })
  }, [])

  return (
    <ScrollView style={classes.container}>
      <Button 
        title='Register a new user'
        onPress={() => navigation.navigate('CreateUser')}
      />
      <View style={{ marginTop: 10 }}>
        {users.length > 0 && users.map(user => {
          const { id, name, email } = user

          return (
            <ListItem
              key={id}
              bottomDivider
              onPress={
                () => navigation.navigate('UserDetail', { id: id as string })
              }
            >
              <ListItem.Chevron />
              <Avatar
                source={{ uri: ACECOM_WD }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Subtitle style={{ textTransform: 'lowercase' }}>
                  {email}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default UsersList
