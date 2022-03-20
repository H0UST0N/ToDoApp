import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  fontColor?: string;
  loading?: boolean; 
}

export function Button({title,backgroundColor,fontColor,loading, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: backgroundColor}]} {...rest}>
      {!loading 
        ? <Text style={[styles.text,{color: fontColor ? fontColor : '#000000'}]}>{title}</Text>
        : <ActivityIndicator color={'#FFF'} size="small" />
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold'
  },
});
