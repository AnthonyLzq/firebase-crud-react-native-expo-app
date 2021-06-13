import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

interface ICustomTextInputProps {
  isEditable?  : boolean
  onChangeText : (text: string) => void
  placeHolder  : string
  value        : string
  keyboardType?: 'phone-pad'
}

const classes = StyleSheet.create({
  inputGroup: {
    flex             : 1,
    padding          : 0,
    marginBottom     : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222'
  }
})

const CustomTextInput = ({
  isEditable = true,
  onChangeText,
  placeHolder,
  value,
  keyboardType
}: ICustomTextInputProps) => (
  <View style={classes.inputGroup}>
    <TextInput
      editable={isEditable}
      onChangeText={onChangeText}
      placeholder={placeHolder}
      value={value}
      keyboardType={keyboardType ?? 'default'}
    />
  </View>
)

export default CustomTextInput
