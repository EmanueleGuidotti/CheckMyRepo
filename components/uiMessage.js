import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

function UiMessage(props) {
  return (
    <View style={[styles.messageContainer, props.messageType]}>
      <Text style={styles.messageContainer__text}>{props.messageText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    paddingTop: 40,
  },
  messageContainer__text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
  },
});

export default UiMessage;
