import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress,loading, ...props}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      style={{
        backgroundColor: '#4d8bf0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
          {loading ?  <ActivityIndicator size="small" color="white" /> : label}
  
      </Text>
    </TouchableOpacity>
  );
}