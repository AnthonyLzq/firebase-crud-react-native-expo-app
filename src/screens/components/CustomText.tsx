import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

interface ICustomTextProps {
  id   : string
  value: string
}

const classes = StyleSheet.create({
  container: {
    padding: 15
  },
  text: {
    fontSize: 17
  }
})

const CustomText = ({ id, value }: ICustomTextProps) => {
  return (
    <View style={classes.container}>
      <Text style={classes.text}>{id}: {value}</Text>
    </View>
  )
}

export default CustomText
